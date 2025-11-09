import { useInfiniteQuery } from "@tanstack/react-query";
import RedditPost from "../entities/RedditPost";
import APIClient, { FetchResponse } from "../services/api-client";

const api = new APIClient<RedditPost>("/games");

const useRedditPosts = (id: number) => {
    return useInfiniteQuery<FetchResponse<RedditPost>, Error>({
        queryKey: ["reddit", id],
        queryFn: ({ pageParam = 1 }) => api.getAll({
            url: `/games/${id}/reddit`, params: { page: pageParam, page_size: 10 }
        }),
        getNextPageParam: (last, all) => (last.next ? all.length + 1 : undefined)
    });
};

export default useRedditPosts;
