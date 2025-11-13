import { Box, HStack, Icon, Link, SimpleGrid, Text } from "@chakra-ui/react";
import iconMap from "../constants/platformIconMaps";
import Game from "../entities/Game";
import { formatDate } from "../utils/format";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";
import RatingBadge from "./RatingBadge";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <Box>
      <RatingBadge
        rating={Math.round(game.rating)}
        reviewCount={game.reviews_count}
        ratings={game.ratings}
      />
      <SimpleGrid columns={2} as="dl">
        <DefinitionItem term="Platforms">
          {game.parent_platforms?.map(({ platform }) => (
            <HStack key={platform.id} spacing={2}>
              <Icon
                as={iconMap[platform.slug]}
                color="gray.500"
                data-testid={`icon-${platform.slug}`}
              />
              <Text>{platform.name}</Text>
            </HStack>
          ))}
        </DefinitionItem>
        <DefinitionItem term="Metascore">
          <CriticScore score={game.metacritic} />
        </DefinitionItem>
        <DefinitionItem term="Genres">
          {game.genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
        </DefinitionItem>
        <DefinitionItem term="Publishers">
          {game.publishers.map((publisher) => (
            <Text key={publisher.id}>{publisher.name}</Text>
          ))}
        </DefinitionItem>
        <DefinitionItem term="Release date">
          <Text>{formatDate(game?.released)}</Text>
        </DefinitionItem>
        <DefinitionItem term="Website">
          <Text>
            <Link href={game.website} color="teal.300" isExternal>
              {game.name}
            </Link>
          </Text>
        </DefinitionItem>
        <DefinitionItem term="Metacritic Review">
          <Text>
            <Link href={game.metacritic_url} color="teal.300" isExternal>
              Review of {game.name}
            </Link>
          </Text>
        </DefinitionItem>
      </SimpleGrid>
    </Box>
  );
};

export default GameAttributes;
