import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Game from "../entities/Game";
import { DisplayOptions } from "../entities/GameDisplayOption";
import APIClient, { FetchResponse } from "../services/api-client";
import { ymd } from "../utils/datehelpers";

const apiClient = new APIClient<Game>("/games");

const useGamesDisplay = (
    { mode, count = 8, year = new Date().getFullYear() }: DisplayOptions
) => {
    return useQuery<FetchResponse<Game>, Error>({
        queryKey: ["gamesDisplayList", mode, count, year],
        queryFn: () => {
            const params: Record<string, any> = { page_size: count };

            switch (mode) {
                case "bestOfYear":
                    params.dates = `${year}-01-01,${year}-12-31`;
                    params.ordering = "-rating, -ratings_count";
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
                    params.ordering = "-rating, -ratings_count";
                    break;
            }

            return apiClient.getAll({ params });
        },
        staleTime: ms("24h"),
        cacheTime: ms("24h"),
        keepPreviousData: true,
    });
};

export default useGamesDisplay;