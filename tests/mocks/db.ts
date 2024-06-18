import { faker } from '@faker-js/faker';
import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data';
import Genre from '../../src/entities/Genre';
import Publisher from '../../src/entities/Publisher';

export interface ParentPlatform {
    id: number;
    platform: any;
}

export default interface Game {
    name: string;
    id: number;
    slug: string;
    genres: Genre[];
    publishers: Publisher[]
    description_raw: string;
    background_image: string;
    parent_platforms: ParentPlatform[];
    metacritic: number;
    rating_top: number;
    added: Date;
    released: Date;
}


export const db = factory({
    genre: {
        id: primaryKey(faker.number.int),
        name: () => faker.string.alphanumeric(5),
        image_background: faker.image.url,
    },
    platform: {
        id: primaryKey(faker.number.int),
        name: () => faker.string.alphanumeric(5),
        slug: faker.lorem.slug
    },
    publisher: {
        id: primaryKey(faker.number.int),
        name: faker.company.name
    },
    screenshot: {
        id: primaryKey(faker.number.int),
        image: faker.image.url,
        width: () => faker.number.int({ min: 1800, max: 1920 }),
        height: () => faker.number.int({ min: 1000, max: 1200 }),
        game: oneOf('game')
    },
    videoData: {
        id: primaryKey(faker.number.int),
        480: faker.image.url,
        mas: faker.image.url
    },
    trailer: {
        id: primaryKey(faker.number.int),
        name: faker.music.songName,
        preview: faker.image.url,
        data: oneOf('videoData'),
        game: oneOf('game')
    },
    parentPlatform: {
        id: primaryKey(faker.number.int),
        platform: oneOf('platform')
    },
    game: {
        name: faker.music.songName,
        id: primaryKey(faker.number.int),
        slug: faker.lorem.slug,
        genres: manyOf('genre'),
        publishers: manyOf('publisher'),
        description_raw: () => faker.lorem.words(10),
        background_image: faker.image.url,
        parent_platforms: manyOf('parentPlatform'),
        metacritic: () => faker.number.int({ min: 80, max: 99 }),
        rating_top: () => faker.number.int({ min: 1, max: 5 }),
        added: faker.date.recent,
        released: faker.date.past
    }
});

export const createGenre = (name?: string) => db.genre.create({ name: name });
export const createPlatform = (slug?: string) => db.platform.create({ name: slug, slug: slug });
export const createPublisher = () => db.publisher.create();
export const createParentPlatform = (slug?: string) => db.parentPlatform.create({ platform: createPlatform(slug) });
export const createGame = (genres: Genre[], publishers: Publisher[], parent_platforms: ParentPlatform[]) =>
    db.game.create({
        genres: genres,
        publishers: publishers,
        parent_platforms: parent_platforms,
    });

export const deleteGenres = (genreIds: number[]) => db.genre.deleteMany({ where: { id: { in: genreIds } } });
export const deleteParentPlatforms = (parentPlatformIds: number[]) => db.parentPlatform.deleteMany({ where: { id: { in: parentPlatformIds } } });
export const deletePublishers = (publisherIds: number[]) => db.publisher.deleteMany({ where: { id: { in: publisherIds } } });
export const deletePlatforms = (platformIds: number[]) => db.platform.deleteMany({ where: { id: { in: platformIds } } });
export const cleanDB = (gameId: number) => {
    const game = db.game.findFirst({ where: { id: { equals: gameId } } });

    let genreIds = game?.genres?.map((g) => g.id) || [];
    let publisherIds = game?.publishers?.map((p) => p.id) || [];
    let platformIds = game?.parent_platforms?.map((p) => p.platform!.id) || [];
    let parentPlatformIds = game?.parent_platforms?.map((p) => p.id) || [];

    db.game.delete({ where: { id: { equals: gameId } } });
    deleteParentPlatforms(parentPlatformIds);
    deleteGenres(genreIds);
    deletePublishers(publisherIds);
    deletePlatforms(platformIds);
}

export const clearDatabase = () => {
    Object.keys(db).forEach(modelKey => {
        db[modelKey].deleteMany({
            where: {},
        });
    });
};


