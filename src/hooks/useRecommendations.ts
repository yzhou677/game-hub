import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../authstore";
import { RecommendationResponse } from "../entities/RecommendedGame";
import recommendationClient from "../services/recommendation-service";

const useRecommendations = (favorites: string[]) => {
    const user = useAuthStore((s) => s.user);
    const stableKey = JSON.stringify([...favorites].sort());

    return useQuery<RecommendationResponse, Error>({
        queryKey: ["recommendations", user?.uid, stableKey],
        queryFn: async () => {
            if (!user || !favorites.length)
                return { summary: "", recommendations: [] };

            const res = await recommendationClient.recommend(favorites);
            return res;
        },
        enabled: !!user && favorites.length > 0,
        staleTime: Infinity,
        retry: 1
    });
}

export default useRecommendations;