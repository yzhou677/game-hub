import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useFavorites from "../hooks/useFavorites";
import useFavoriteSort, { FavoriteSortKey } from "../hooks/useFavoriteSort";
import GameCardsLayout from "./GameCardsLayout";
import SortSelector from "./SortSelector";

const FavoritesGrid = () => {
  const { data, error, isLoading } = useFavorites();

  if (error) return <Text>{error.message}</Text>;

  const games = data ?? [];
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const { favoriteSort, setFavoriteSort, sortedFavorites } =
    useFavoriteSort(games);

  if (!isLoading && games.length === 0) {
    return <Text padding="10px">No Favorite Games</Text>;
  }

  return (
    <>
      <Box paddingLeft={2}>
        <Heading as="h1" marginY={5} fontSize="5xl">
          My Favorites
        </Heading>
        <Flex marginBottom={5}>
          <SortSelector
            value={favoriteSort}
            onChange={(v) => setFavoriteSort(v as FavoriteSortKey)}
          />
        </Flex>
      </Box>

      <GameCardsLayout
        games={sortedFavorites}
        isLoading={isLoading}
        skeletons={skeletons}
      />
    </>
  );
};

export default FavoritesGrid;
