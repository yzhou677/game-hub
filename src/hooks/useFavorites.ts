import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../authstore";
import Game from "../entities/Game";
import favoriteService from "../services/favorite-service";
import { useSettingsStore } from "../settingsstore";
import { isNsfw } from "../utils/nsfwUtils";

const useFavorites = () => {
    const user = useAuthStore((s) => s.user);
    const hideNsfw = useSettingsStore((s) => s.hideNsfw);

    return useQuery<Game[], Error>({
        queryKey: ["favorites", user?.uid, hideNsfw],
        queryFn: () =>
            favoriteService.getFavorites(user!.uid).then((games) => {
                if (!hideNsfw) return games;
                return games.filter((game) => !isNsfw(game.tags ?? []));
            }),
        enabled: !!user,
    });
};

export default useFavorites;