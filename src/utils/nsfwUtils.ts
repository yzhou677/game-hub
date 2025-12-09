import Tag from "../entities/Tag";

const nsfwTagSlugs = [
    "sexual-content",
    "sexual content",
    "nsfw",
    "erotic",
    "hentai",
    "adult",
    "nudity",
    "mature sexual content"

]

export const isNsfw = (tags: Tag[]): boolean => {
    if (!tags) return false;

    return tags.some((tag) => {
        const slug = tag.slug?.toLowerCase();
        const name = tag.name?.toLowerCase();

        return nsfwTagSlugs.includes(slug) || nsfwTagSlugs.includes(name);
    });
};