import { Box, Heading, Text } from "@chakra-ui/react";
import {
  DisplayMode,
  displayModeTitleMap,
} from "../constants/gameDisplayOptions";
import Game from "../entities/Game";
import useGameActions from "../hooks/useGameActions";
import useGamesDisplay from "../hooks/useGamesDisplay";
import GameCardsLayout from "./GameCardsLayout";

interface Props {
  displayMode: DisplayMode;
}

const HomeDisplayGamesList = ({ displayMode }: Props) => {
  const { data, isLoading, error } = useGamesDisplay({
    mode: displayMode,
  });
  const actions = useGameActions();
  if (error) throw error;

  const games: Game[] = data?.results ?? [];
  if (!isLoading && games.length <= 0) return null;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  const title = displayModeTitleMap[displayMode];

  const handleViewAllClick = () => {
    if (displayMode === "releasedThisMonth") {
      actions.thisMonth();
    } else {
      actions.allTimeTop100();
    }
  };

  return (
    <Box mt={10}>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        {title}
      </Heading>
      <Text
        textAlign="center"
        mt={-2}
        color="blue.300"
        cursor="pointer"
        _hover={{ color: "blue.200" }}
        onClick={handleViewAllClick}
      >
        View all →
      </Text>

      <GameCardsLayout
        games={games}
        isLoading={isLoading}
        skeletons={skeletons}
      />
    </Box>
  );
};

export default HomeDisplayGamesList;
