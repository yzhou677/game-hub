import { Box, GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameSwiperGallery from "../components/GameSwiperGallery";
import RedditPosts from "../components/RedditPosts";
import SimilarGames from "../components/SimilarGames";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner role="status" aria-label="Loading" />;
  if (error || !game) throw error;

  return (
    <>
      <Box
        bgImage={`url(${game.background_image})`}
        position="fixed"
        inset={0}
        bgSize="cover"
        bgPosition="top"
        bgRepeat="no-repeat"
        backgroundAttachment="fixed"
        filter="brightness(0.5)"
        minH="100vh"
        zIndex={-2}
      />
      <Box
        position="fixed"
        inset={0}
        bgGradient="linear(to-b, rgba(0,0,0,0.7), rgba(0,0,0,1))"
        zIndex={-1}
        pointerEvents="none"
      />
      <Box maxW="container.xl" py={6} zIndex={0}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="start">
          <GridItem>
            <Heading size="xl" mb={4}>
              {game.name}
            </Heading>
            <Box
              rounded="2xl"
              overflow="hidden"
              borderWidth="1px solid"
              shadow="xl"
            >
              <GameSwiperGallery gameId={game.id} />
            </Box>
            <Box mt={5}>
              <ExpandableText>{game.description_raw}</ExpandableText>
            </Box>
          </GridItem>

          <GridItem display={{ base: "none", md: "block" }}>
            <Box>
              <GameAttributes game={game} />
            </Box>
          </GridItem>
        </SimpleGrid>
        <Box mt={12}>
          <SimilarGames game={game} />
        </Box>
        <Box mt={12}>
          <RedditPosts id={game.id} />
        </Box>
      </Box>
    </>
  );
};

export default GameDetailPage;
