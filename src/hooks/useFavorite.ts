import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "../authstore";
import type Game from "../entities/Game";
import favoriteService from "../services/favoriteService";

const useFavorite = (game: Game) => {
    const user = useAuthStore((s) => s.user);
    const [isFavorite, setIsFavorite] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            return;
        }

        let cancelled = false;

        (async () => {
            const fav = await favoriteService.isFavorite(user.uid, game.id);
            if (!cancelled) setIsFavorite(fav);
        })();

        return () => {
            cancelled = true;
        };
    }, [user, game.id]);

    const toggleFavorite = async () => {
        if (!user) return;

        if (isFavorite) {
            await favoriteService.removeFavorite(user.uid, game.id);
            setIsFavorite(false);
        } else {
            await favoriteService.addFavorite(user.uid, game);
            setIsFavorite(true);
        }

        queryClient.invalidateQueries({
            queryKey: ["favorites", user.uid],
        });

    };
    return { isFavorite, toggleFavorite, user };
};

export default useFavorite;