import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import Game from "../entities/Game";
import useGamesDisplay from "../hooks/useGamesDisplay";
import { GalleryItem } from "../types/galleryItem";

function Thumbnails({ item }: { item: ReactImageGalleryItem }) {
  return (
    <Box
      w="92px"
      h="92px"
      borderRadius="12px"
      overflow="hidden"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
      bg="black"
    >
      <Image
        src={item.thumbnail}
        alt={item.originalAlt || ""}
        objectFit="cover"
        objectPosition="center"
        w="100%"
        h="100%"
        draggable={false}
      />
    </Box>
  );
}

function GameCardSlide({ game }: { game: Game }) {
  return (
    <HStack
      className="image-gallery-image"
      align="stretch"
      bg="black"
      color="white"
      borderRadius="2xl"
      overflow="hidden"
      spacing={0}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box flex={{ base: "none", md: 3 }}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={game.background_image}
            alt={game.name}
            draggable={false}
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </Box>

      <Box
        flex={{ base: "none", md: 1 }}
        p={5}
        bg="gray.700"
        display="flex"
        flexDirection="column"
      >
        <Heading
          as="h2"
          size="md"
          mb={6}
          wordBreak="break-word"
          whiteSpace="normal"
        >
          {game.name}
        </Heading>

        <VStack align="start" spacing={6}>
          {game.released && (
            <Text fontSize="lg">
              Released on: {new Date(game.released).toLocaleDateString()}
            </Text>
          )}
          {game.rating && <Text fontSize="lg">Rating: {game.rating}</Text>}
        </VStack>
      </Box>
    </HStack>
  );
}

const HomeGamesCarousel = () => {
  const { data, isLoading, error } = useGamesDisplay({
    mode: "bestOfYear",
    count: 6,
  });
  if (error) throw error;

  const navigate = useNavigate();
  const currentIndex = useRef(0);

  const isMdUp = useBreakpointValue({ base: false, md: true }) ?? false;
  const showThumbnails = isMdUp;

  const games: Game[] = data?.results ?? [];
  if (isLoading || games.length <= 0) return null;

  const items: GalleryItem[] = games.map((game) => ({
    original: game.background_image,
    thumbnail: game.background_image,
    description: game.slug,
    originalClass: "bg-black",
    slug: game.slug,
    renderItem: () => <GameCardSlide game={game} />,
  }));

  return (
    <>
      <Heading size="lg">Featured Games</Heading>
      <Box className="rounded-2xl overflow-hidden">
        <ImageGallery
          items={items}
          showIndex
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={showThumbnails}
          slideDuration={400}
          additionalClass="gh-media-gallery"
          autoPlay
          slideInterval={3000}
          infinite
          renderThumbInner={(item) => <Thumbnails item={item} />}
          onSlide={(i) => (currentIndex.current = i)}
          onClick={() =>
            navigate(`/games/${items[currentIndex.current].description}`)
          }
        />
      </Box>
    </>
  );
};

export default HomeGamesCarousel;
