import { SimpleGrid } from "@chakra-ui/react";
import Game from "../entities/Game";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  games: Game[];
  isLoading: boolean;
  skeletons: number[];
}

const GameCardsLayout = ({ games, isLoading, skeletons }: Props) => {
  const visibleGames = games.filter((game) => game && game.id);

  return (
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

      {visibleGames.map((game) => (
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameCardsLayout;
