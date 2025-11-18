import { useMemo, useState } from "react";
import type Game from "../entities/Game";

export type FavoriteSortKey = "-added" | "name" | "-rating" | "-metacritic" | "-released" | undefined;

const useFavoriteSort = (favorites: Game[] | undefined) => {
    const [favoriteSort, setFavoriteSort] = useState<FavoriteSortKey>();

    const sortedFavorites = useMemo(() => {
        if (!favorites) return [];

        const games = [...favorites];

        switch (favoriteSort) {
            case "name":
                return games.sort((a, b) =>
                    (a.name ?? "").localeCompare(b.name ?? "")
                );
            case "-rating":
                return games.sort(
                    (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
                );
            case "-metacritic":
                return games.sort(
                    (a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0)
                );
            case "-released":
                return games.sort(
                    (a, b) =>
                        new Date(b.released ?? 0).getTime() -
                        new Date(a.released ?? 0).getTime()
                );
            case "-added":
                return games.sort(
                    (a, b) => (b.added ?? 0) - (a.added ?? 0)
                );
            default:
                return games;
        }
    }, [favorites, favoriteSort]);

    return { favoriteSort, setFavoriteSort, sortedFavorites };
};

export default useFavoriteSort;