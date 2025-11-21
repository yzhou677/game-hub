import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Game>("/games");

const useSimilarGames = (game: Game) => {
    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["similarGames", game?.id],
        queryFn: ({ pageParam = 1 }) => {
            const genreIds = game?.genres?.map((g) => g.id).join(",");
            const tagSlugs = game?.tags?.map((t) => t.slug).join(",");
            const dates =
                game?.released
                    ? `${new Date(game.released).getFullYear() - 5}-01-01,${new Date(game.released).getFullYear() + 5}-12-31`
                    : undefined;
            const params: Record<string, any> = {
                genres: genreIds,
                parent_platforms: game?.parent_platforms?.map((p) => p.platform.id).join(","),
                exclude_additions: true,
                exclude_parents: true,
                ordering: "-rating",
                page: pageParam,
                page_size: 8,
            }

            if (tagSlugs) params.tags = tagSlugs;

            if (dates) params.dates = dates;

            return apiClient.getAll({ params });

        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms("12h")
    });
}

export default useSimilarGames;