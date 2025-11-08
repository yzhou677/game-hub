import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Game from "../entities/Game";
import useSimilarGames from "../hooks/useSimilarGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  game: Game;
}

const SimilarGames = ({ game }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSimilarGames(game);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box mt={10}>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        More Similar Games
      </Heading>

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

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
