import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import { useSettingsStore } from "../settingsstore";
import useGameQueryStore from "../store";

const apiClient = new APIClient<Game>('/games');

const useGames = () => {
    const gameQuery = useGameQueryStore((s) => s.gameQuery);
    const hideNsfw = useSettingsStore((s) => s.hideNsfw);

    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ['games', gameQuery, hideNsfw],
        queryFn: ({ pageParam = 1 }) => apiClient.getAll({
            params: {
                genres: gameQuery.genreId,
                parent_platforms: gameQuery.platformId,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText,
                page: pageParam,
                dates: gameQuery.dates
            }
        }, { hideNsfw }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        }, //react query uses this function to compute next page number
        staleTime: ms("24h"), //24h
        cacheTime: ms("24h"),
    });
};

export default useGames;