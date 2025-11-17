import os
from dotenv import load_dotenv
load_dotenv()

from datetime import datetime, timezone
from typing import List, Dict, Any

import requests
from google.cloud import firestore

RAWG_API_KEY = os.environ.get("RAWG_API_KEY")
RAWG_BASE_URL = "https://api.rawg.io/api/games"

MAX_GAMES = 200       
PAGE_SIZE = 40         
ORDERING = "-rating,-ratings_count"

db = firestore.Client()

def fetch_top_games(limit: int = MAX_GAMES, page_size: int = PAGE_SIZE) -> List[Dict[str, Any]]:
    if not RAWG_API_KEY:
        raise RuntimeError("RAWG_API_KEY is not set in environment variables.")

    games: List[Dict[str, Any]] = []
    page = 1
    session = requests.Session()

    while len(games) < limit:
        params = {
            "key": RAWG_API_KEY,
            "page": page,
            "page_size": page_size,
            "ordering": ORDERING,
        }
        print(f"[RAWG] Fetching page {page} ...")

        resp = session.get(RAWG_BASE_URL, params=params, timeout=20)
        resp.raise_for_status()
        data = resp.json()

        results = data.get("results") or []
        if not results:
            print("[RAWG] No more results, stop.")
            break

        games.extend(results)

        if len(results) < page_size:
            break

        page += 1

    final_games = games[:limit]
    print(f"[RAWG] Fetched {len(final_games)} games (limit = {limit}).")
    return final_games

def serialize_game(rawg_game: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": rawg_game["id"],
        "slug": rawg_game.get("slug"),
        "name": rawg_game.get("name"),
        "background_image": rawg_game.get("background_image"),
        "rating": rawg_game.get("rating"),
        "metacritic": rawg_game.get("metacritic"),
        "released": rawg_game.get("released"),
        "added": rawg_game.get("added"),

        "genres": [
            {"id": g.get("id"), "name": g.get("name")}
            for g in (rawg_game.get("genres") or [])
        ],

        "publishers": [
            {"id": p.get("id"), "name": p.get("name")}
            for p in (rawg_game.get("publishers") or [])
        ],

        "parent_platforms": [
            {
                "platform": {
                    "id": (p.get("platform") or {}).get("id"),
                    "name": (p.get("platform") or {}).get("name"),
                    "slug": (p.get("platform") or {}).get("slug"),
                }
            }
            for p in (rawg_game.get("parent_platforms") or [])
        ],

        "tags": [
            {
                "id": t.get("id"),
                "name": t.get("name"),
                "slug": t.get("slug"),
            }
            for t in (rawg_game.get("tags") or [])
        ],

        "updatedAt": firestore.SERVER_TIMESTAMP,
        "batchMonth": datetime.now(timezone.utc).strftime("%Y-%m"),
    }

def sync_top_games_to_firestore(limit: int = MAX_GAMES) -> None:
    games = fetch_top_games(limit=limit)
    collection = db.collection("rawgTopGames")

    batch = db.batch()
    for g in games:
        doc_id = str(g["id"])
        doc_ref = collection.document(doc_id)
        batch.set(doc_ref, serialize_game(g))

    try:
        batch.commit()
    except Exception as e:
        print("[Firestore] Commit failed:", e)
        raise
    print(f"[Firestore] Synced {len(games)} games into 'rawgTopGames' collection.")


if __name__ == "__main__":
    sync_top_games_to_firestore()