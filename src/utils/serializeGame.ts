import type Game from "../entities/Game";

export function serializeGame(game: Game) {
    return {
        id: game.id,
        slug: game.slug ?? null,
        name: game.name ?? null,
        background_image: game.background_image ?? null,
        rating: game.rating ?? null,
        metacritic: game.metacritic ?? null,
        released: game.released ?? null,
        added: game.added ?? null,

        genres: game.genres?.map((g) => ({
            id: g.id ?? null,
            name: g.name ?? null,
        })) ?? [],

        publishers: game.publishers?.map((p) => ({
            id: p.id ?? null,
            name: p.name ?? null,
        })) ?? [],

        tags: game.tags?.map((t) => ({
            id: t.id ?? null,
            name: t.name ?? null,
            slug: t.slug ?? null
        })) ?? [],

        parent_platforms:
            game.parent_platforms?.map((p) => ({
                platform: {
                    id: p.platform.id ?? null,
                    name: p.platform.name ?? null,
                    slug: p.platform.slug ?? null,
                },
            })) ?? [],

        addedAt: new Date(),
    };
}
