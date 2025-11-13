import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import useGameQueryStore from "../store";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

const LIMIT = 100;
const isTopMode = (key?: string) =>
  key === "bestOfYear" || key === "popularLastYear" || key === "allTimeTop100";

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
  const activeKey = useGameQueryStore((s) => s.gameQuery.activeKey);

  if (error) return <Text>{error.message}</Text>;

  const allGames = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data]
  );

  const games = useMemo(
    () => (isTopMode(activeKey) ? allGames.slice(0, LIMIT) : allGames),
    [allGames, activeKey]
  );

  const more =
    !!hasNextPage && (!isTopMode(activeKey) ? true : allGames.length < LIMIT);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <InfiniteScroll
      dataLength={games.length}
      hasMore={more}
      next={() => {
        if (more) fetchNextPage();
      }}
      loader={<Spinner />}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {isLoading &&
          allGames.length === 0 &&
          skeletons.map((n) => (
            <GameCardContainer key={n}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
