import { Box, Button, Heading } from "@chakra-ui/react";
import Game from "../entities/Game";
import useSimilarGames from "../hooks/useSimilarGames";
import GameCardsLayout from "./GameCardsLayout";

interface Props {
  game: Game;
}

const SimilarGames = ({ game }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSimilarGames(game);

  const games = data?.pages.flatMap((p) => p.results) ?? [];
  if (!isLoading && games.length <= 0) return null;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box mt={10}>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        More Similar Games
      </Heading>

      <GameCardsLayout
        games={games}
        isLoading={isLoading}
        skeletons={skeletons}
      />

      {hasNextPage && (
        <Box textAlign="center" mt={6}>
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            bg="gray.700"
            color="gray.200"
            _hover={{ bg: "gray.600" }}
            _active={{ bg: "gray.500" }}
            size="lg"
            rounded="md"
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SimilarGames;
