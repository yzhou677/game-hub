import Genre from "./Genre";
import Platform from "./Platform";
import Publisher from "./Publisher";
import Rating from "./Rating";
import Tag from "./Tag";

export default interface Game {
    name: string;
    id: number;
    slug: string;
    genres: Genre[];
    publishers: Publisher[]
    description_raw: string;
    background_image: string;
    parent_platforms: { platform: Platform; }[];
    metacritic: number;
    rating_top: number;
    website: string;
    reviews_count: number;
    ratings: Rating[];
    tags: Tag[];
    released: string;
}
