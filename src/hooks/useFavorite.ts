import { useEffect, useState } from "react";
import { useAuthStore } from "../authstore";
import type Game from "../entities/Game";
import favoriteService from "../services/favoriteService";

const useFavorite = (game: Game) => {
    const user = useAuthStore((s) => s.user);
    const [isFavorite, setIsFavorite] = useState(false);

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
    };
    return { isFavorite, toggleFavorite, user };
};

export default useFavorite;