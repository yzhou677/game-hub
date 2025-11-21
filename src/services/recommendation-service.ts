import axios from "axios";
import { getAuth, User } from "firebase/auth";
import { RecommendedGame } from "../entities/RecommendedGame";

const backendAxios = axios.create({
    baseURL: "https://api-qai26z4joq-uc.a.run.app",
});

const auth = getAuth();

backendAxios.interceptors.request.use(async (config) => {
    const user: User | null = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();

        config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
        } as any;
    }

    return config;
});

export interface RecommendResponse {
    recommendations: RecommendedGame[];
}

class RecommendationClient {
    endpoint: string;

    constructor(endpoint: string = "/recommend") {
        this.endpoint = endpoint;
    }

    recommend = (favorites: string[]) => {
        return backendAxios
            .post<RecommendResponse>(this.endpoint, { favorites })
            .then((res) => res.data);
    };
}

export default new RecommendationClient();