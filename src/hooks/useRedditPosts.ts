import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import RedditPost from "../entities/RedditPost";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<RedditPost>("/games");

const useRedditPosts = (id: number) => {
    return useInfiniteQuery<FetchResponse<RedditPost>, Error>({
        queryKey: ["reddit", id],
        queryFn: ({ pageParam = 1 }) => apiClient.getAll({
            url: `/games/${id}/reddit`, params: { page: pageParam, page_size: 10 }
        }),
        getNextPageParam: (last, all) => (last.next ? all.length + 1 : undefined),
        staleTime: ms("10m"),
        cacheTime: ms("30m"),
    });
};

export default useRedditPosts;
