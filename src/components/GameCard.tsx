import { Box, Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import FavoriteButton from "./FavoriteButton";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Box
      as={Link}
      to={`/games/${game.slug}`}
      _hover={{ textDecoration: "none" }}
    >
      <Card>
        <Box position="relative">
          <Image src={getCroppedImageUrl(game.background_image)} alt="Game" />

          <Box
            position="absolute"
            bottom="8px"
            right="8px"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteButton game={game} size="sm" />
          </Box>
        </Box>

        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            {game.parent_platforms && (
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />
            )}
            <CriticScore score={game.metacritic} />
          </HStack>
          <Heading fontSize="2xl">
            {game.name}
            <Emoji rating={Math.round(game.rating)} />
          </Heading>
        </CardBody>
      </Card>
    </Box>
  );
};

export default GameCard;
