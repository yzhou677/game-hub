import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Game>("/games");

const useSimilarGames = (game?: Game) => {
    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["similarGames", game?.id],
        enabled: !!game,
        queryFn: ({ pageParam = 1 }) => apiClient.getAll({
            params: {
                genres: game?.genres?.map((g) => g.id).join(","),
                parent_platforms: game?.parent_platforms?.map((p) => p.platform.id).join(","),
                exclude_additions: true,
                exclude_parents: true,
                ordering: "-rating",
                page: pageParam,
                page_size: 8,
            }
        }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms('12h')
    });
}

export default useSimilarGames;