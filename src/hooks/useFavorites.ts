import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../authstore";
import Game from "../entities/Game";
import favoriteService from "../services/favorite-service";

const useFavorites = () => {
    const user = useAuthStore((s) => s.user);

    return useQuery<Game[], Error>({
        queryKey: ["favorites", user?.uid],
        queryFn: () => favoriteService.getFavorites(user!.uid),
        enabled: !!user,
    });
};

export default useFavorites;