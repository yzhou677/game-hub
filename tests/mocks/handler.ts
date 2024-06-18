import { HttpResponse, http } from 'msw';
import { db } from './db';

const baseURL = 'https://api.rawg.io/api';
const PAGE_SIZE = 20;

export const handlers = [
  http.get(baseURL + '/games/:id', ({ params }) => {
    const id = params.id as string;

    const game = db.game.findFirst({
      where: {
        slug: {
          equals: id,
        },
      },
    });

    if (!game) {
      return new HttpResponse(null);
    }
    return HttpResponse.json(game)
  }),

  http.get(baseURL + '/games', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')!);
    const ordering = url.searchParams.get('ordering');
    let genreId: number;
    let platformId: number;
    let search: string;
    let nextURL: string = `${baseURL}/games?`;

    const filters: any = {};
    if (url.searchParams.get('genres')) {
      genreId = parseInt(url.searchParams.get('genres')!);
      nextURL = `${nextURL}genres=${genreId}&`
      filters.genres = { id: { equals: genreId } };
    }
    if (url.searchParams.get('parent_platforms')) {
      platformId = parseInt(url.searchParams.get('parent_platforms')!);
      nextURL = `${nextURL}parent_platforms=${platformId}&`
      filters.parent_platforms = { platform: { id: { equals: platformId } } };
    }
    if (url.searchParams.get('search')) {
      search = url.searchParams.get('search')!;
      nextURL = `${nextURL}search=${search}&`
      filters.slug = { contains: search };
    }

    let filteredGames = db.game.findMany({
      where: filters,
    });

    // Remove duplicates by id
    const gamesById = new Map();
    for (const game of filteredGames) {
      gamesById.set(game.id, game);
    }
    filteredGames = Array.from(gamesById.values());

    if (ordering) {
      nextURL = `${nextURL}ordering=${ordering}&`
      const [orderKey, orderDirection] = ordering.startsWith('-')
        ? [ordering.slice(1), 'desc']
        : [ordering, 'asc'];

      filteredGames = filteredGames.sort((a, b) => {
        if (a[orderKey] < b[orderKey]) return orderDirection === 'asc' ? -1 : 1;
        if (a[orderKey] > b[orderKey]) return orderDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = filteredGames.length;
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedGames = filteredGames.slice(start, end);

    if (!filteredGames) {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null
      });
    }

    const response = {
      count: total,
      results: paginatedGames,
      next: end < total ? `${nextURL}page=${page + 1}` : null,
    };

    return HttpResponse.json(response)
  }),

  http.get(baseURL + '/genres', () => {
    const genres = db.genre.getAll();

    if (!genres || genres.length === 0) {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null
      });
    }
    return HttpResponse.json({
      count: genres.length,
      results: genres,
      next: null
    });
  }),

  http.get(baseURL + '/platforms/lists/parents', () => {
    const platforms = db.platform.getAll();

    if (!platforms || platforms.length === 0) {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null
      });
    }

    return HttpResponse.json({
      count: platforms.length,
      results: platforms,
      next: null
    });
  }),

  http.get(baseURL + '/games/:gameId/screenshots', ({ params }) => {
    const gameId = parseInt(params.gameId as string);

    const screenshots = db.screenshot.findMany({
      where: {
        game: {
          id: {
            equals: Number(gameId),
          },
        },
      },
    });


    if (!screenshots || screenshots.length === 0) {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null
      });
    }

    return HttpResponse.json({
      count: screenshots.length,
      results: screenshots,
      next: null
    });
  }),

  http.get(baseURL + '/games/:gameId/movies', ({ params }) => {
    const gameId = parseInt(params.gameId as string);

    const trailers = db.trailer.findMany({
      where: {
        game: {
          id: {
            equals: Number(gameId),
          },
        },
      },
    });


    if (!trailers || trailers.length === 0) {
      return HttpResponse.json({
        count: 0,
        results: [],
        next: null
      });
    }

    return HttpResponse.json({
      count: trailers.length,
      results: trailers,
      next: null
    });
  }),

];

