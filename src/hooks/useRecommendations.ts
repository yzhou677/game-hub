import { useQuery } from "@tanstack/react-query";
import { RecommendedGame } from "../entities/RecommendedGame";
import recommendationClient from "../services/recommendation-service";

const useRecommendations = (favorites: string[]) => {
    const stableKey = JSON.stringify([...favorites].sort());

    return useQuery<RecommendedGame[], Error>({
        queryKey: ["recommendations", stableKey],

        queryFn: async () => {
            if (!favorites || favorites.length === 0)
                return [];

            const res = await recommendationClient.recommend(favorites);
            return res.recommendations;
        },
        enabled: favorites.length > 0,
        staleTime: Infinity,
        retry: 1
    });
}

export default useRecommendations;