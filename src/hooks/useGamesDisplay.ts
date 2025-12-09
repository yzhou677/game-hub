import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { DisplayOptions } from "../constants/gameDisplayOptions";
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import { useSettingsStore } from "../settingsstore";
import { ymd } from "../utils/datehelpers";

const apiClient = new APIClient<Game>("/games");
const NSFW_MULTIPLIER = 4;

const useGamesDisplay = (
    { mode, count = 8, year = new Date().getFullYear() }: DisplayOptions
) => {
    const hideNsfw = useSettingsStore((s) => s.hideNsfw);

    return useQuery<FetchResponse<Game>, Error>({
        queryKey: ["gamesDisplayList", mode, count, year, hideNsfw],
        queryFn: () => {
            const effectivePageSize = hideNsfw ? count * NSFW_MULTIPLIER : count;

            const params: Record<string, any> = { page_size: effectivePageSize };

            switch (mode) {
                case "bestOfYear":
                    params.dates = `${year}-01-01,${year}-12-31`;
                    params.ordering = "-suggested";
                    break;

                case "releasedThisMonth": {
                    const now = new Date();
                    const start = new Date(now.getFullYear(), now.getMonth(), 1);
                    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    params.dates = `${ymd(start)},${ymd(end)}`;
                    params.ordering = "-released";
                    break;
                }

                case "allTimeTop100":
                    params.ordering = "-suggested";
                    break;
            }

            return apiClient.getAll({ params }, { hideNsfw }).then((data) => ({
                ...data,
                results: data.results.slice(0, count),
            }));;
        },
        staleTime: ms("24h"),
        cacheTime: ms("24h"),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

export default useGamesDisplay;