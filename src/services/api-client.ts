import axios, { AxiosRequestConfig } from "axios";
import Tag from "../entities/Tag";
import { isNsfw } from "../utils/nsfwUtils";

export interface FetchResponse<T> {
    count: number;
    results: T[];
    next: string | null;
}

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: import.meta.env.VITE_RAWG_API_KEY
    }
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (
        config: AxiosRequestConfig & { url?: string } = {},
        options?: { hideNsfw?: boolean }
    ) => {
        const url = config.url ?? this.endpoint;
        const { url: _omit, ...rest } = config;

        return axiosInstance
            .get<FetchResponse<T>>(url, rest)
            .then(res => {
                if (!options?.hideNsfw) return res.data;

                const filteredResults = res.data.results.filter(item => {
                    const tags = (item as any).tags as Tag[] | undefined;
                    if (!tags) return true;
                    return !isNsfw(tags);
                });
                return {
                    ...res.data,
                    results: filteredResults
                };
            });
    }

    get = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data);
    }
}

export default APIClient;