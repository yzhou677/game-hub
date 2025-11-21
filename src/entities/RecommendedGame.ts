import Game from "./Game";

export interface RecommendedGame extends Game {
    reason: string;
}

export interface RecommendationResponse {
    summary: string;
    recommendations: RecommendedGame[];
}