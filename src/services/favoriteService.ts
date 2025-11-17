import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc
} from "firebase/firestore";
import type Game from "../entities/Game";
import { db } from "../firebase";
import { serializeGame } from "../utils/serializeGame";

const favoriteDoc = (uid: string, gameId: number) => doc(db, "users", uid, "favorites", String(gameId));

const favoritesCollection = (uid: string) =>
    collection(db, "users", uid, "favorites");

const isFavorite = async (uid: string, gameId: number) => {
    const snap = await getDoc(favoriteDoc(uid, gameId));
    return snap.exists();
};

const addFavorite = async (uid: string, game: Game) => {
    await setDoc(favoriteDoc(uid, game.id), serializeGame(game));
};

const removeFavorite = async (uid: string, gameId: number) => {
    await deleteDoc(favoriteDoc(uid, gameId));
};

const getFavorites = async (uid: string): Promise<Game[]> => {
    const q = query(favoritesCollection(uid), orderBy("addedAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((doc) => {
        const data = doc.data() as any;
        return {
            id: data.id,
            ...data,
        } as Game
    });
};

const favoriteService = {
    isFavorite,
    addFavorite,
    removeFavorite,
    getFavorites,
};
export default favoriteService;
