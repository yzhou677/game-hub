import {
  Box,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  useTheme,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameSwiperGallery from "../components/GameSwiperGallery";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const theme = useTheme();

  if (isLoading) return <Spinner role="status" aria-label="Loading" />;
  if (error || !game) throw error;

  return (
    <Container maxW="container.xl" py={theme.space[6]}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={theme.space[8]}
        alignItems="start"
      >
        <GridItem>
          <Heading size="lg" mb={theme.space[4]}>
            {game.name}
          </Heading>
          <Box
            rounded="2xl"
            overflow="hidden"
            borderWidth={`theme.borders.base ?? "1px solid"`}
            shadow="xl"
          >
            <GameSwiperGallery gameId={game.id} />
          </Box>
          <Box mt={theme.space[5]}>
            <ExpandableText>{game.description_raw}</ExpandableText>
          </Box>
        </GridItem>

        <GridItem display={{ base: "none", md: "block" }}>
          <Box
            position="sticky"
            top={`calc(${theme.sizes.header ?? "64px"} + ${theme.space[4]})`}
          >
            <GameAttributes game={game} />
          </Box>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default GameDetailPage;
