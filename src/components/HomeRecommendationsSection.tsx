import { Box, Heading, Text } from "@chakra-ui/react";
import Game from "../entities/Game";
import useRecommendations from "../hooks/useRecommendations";
import ExpandableText from "./ExpandableText";
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

  const games = data?.recommendations ?? [];
  if (!isLoading && (!data || games.length === 0)) return null;
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const summary = data?.summary;

  return (
    <Box mt={10}>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        Recommended for you
      </Heading>
      {summary && (
        <Box
          maxW="5xl"
          mx="auto"
          mb={6}
          px={{ base: 4, md: 6 }}
          py={{ base: 3, md: 4 }}
          bg="gray.800"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.12em"
            color="whiteAlpha.700"
            mb={1}
          >
            Why these games
          </Text>

          <ExpandableText>{summary}</ExpandableText>
        </Box>
      )}

      <GameCardsLayout
        games={games}
        isLoading={isLoading}
        skeletons={skeletons}
      />
    </Box>
  );
};

export default HomeRecommendationsSection;
