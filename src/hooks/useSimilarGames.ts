import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import { useSettingsStore } from "../settingsstore";

const apiClient = new APIClient<Game>("/games");
const SIMILAR_VISIBLE_COUNT = 8;
const NSFW_MULTIPLIER = 4;

const useSimilarGames = (game: Game) => {
    const hideNsfw = useSettingsStore((s) => s.hideNsfw);

    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["similarGames", game?.id, hideNsfw],
        enabled: !!game,
        queryFn: ({ pageParam = 1 }) => {
            const genreIds = game?.genres?.map((g) => g.id).join(",");
            const tagSlugs = game?.tags?.map((t) => t.slug).join(",");
            const dates =
                game?.released
                    ? `${new Date(game.released).getFullYear() - 5}-01-01,${new Date(game.released).getFullYear() + 5}-12-31`
                    : undefined;
            const effectivePageSize = hideNsfw
                ? SIMILAR_VISIBLE_COUNT * NSFW_MULTIPLIER
                : SIMILAR_VISIBLE_COUNT;

            const params: Record<string, any> = {
                genres: genreIds,
                parent_platforms: game?.parent_platforms?.map((p) => p.platform.id).join(","),
                exclude_additions: true,
                exclude_parents: true,
                ordering: "-rating",
                page: pageParam,
                page_size: effectivePageSize,
            }

            if (tagSlugs) params.tags = tagSlugs;
            if (dates) params.dates = dates;

            return apiClient
                .getAll({ params }, { hideNsfw })
                .then((data) => ({
                    ...data,
                    results: data.results.slice(0, SIMILAR_VISIBLE_COUNT),
                }));
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms("12h")
    });
}

export default useSimilarGames;