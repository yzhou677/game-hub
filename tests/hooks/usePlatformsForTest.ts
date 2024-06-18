import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../src/services/api-client";

const apiClient = new APIClient('/platforms/lists/parents');

export const usePlatformsForTest = () => useQuery({
    queryKey: ['platforms'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'), //24h
});
