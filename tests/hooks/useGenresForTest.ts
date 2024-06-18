import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../src/services/api-client";

const apiClient = new APIClient("/genres");

export const useGenresForTest = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: apiClient.getAll,
        staleTime: ms("24h")
    });
};