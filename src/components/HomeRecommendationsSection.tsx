import { Box, Heading } from "@chakra-ui/react";
import Game from "../entities/Game";
import useRecommendations from "../hooks/useRecommendations";
import GameCardsLayout from "./GameCardsLayout";

interface Props {
  favorites: Game[];
}

const HomeRecommendationsSection = ({ favorites }: Props) => {
  const { data, isLoading, error } = useRecommendations(
    favorites.map((g) => g.name)
  );

  if (error) throw error;
  if (!favorites.length) return null;

  const games = data ?? [];
  if (!isLoading && games.length === 0) return null;
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box mt={10}>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        Recommended for you
      </Heading>

      <GameCardsLayout
        games={games}
        isLoading={isLoading}
        skeletons={skeletons}
      />
    </Box>
  );
};

export default HomeRecommendationsSection;
