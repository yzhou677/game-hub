import ImageGallery from "react-image-gallery";
import Screenshot from "../entities/Screenshot";
import Trailer from "../entities/Trailer";
import useScreenshots from "../hooks/useScreenshots";
import useTrailers from "../hooks/useTrailers";
import { GalleryItem } from "../types/galleryItem";

interface Props {
  gameId: number;
}

function VideoSlide({ item }: { item: Trailer }) {
  return (
    <div
      className="w-full h-full bg-black grid place-items-center"
      style={{ aspectRatio: "16/9" }}
    >
      <video
        className="w-full h-full object-contain"
        src={item.data[480]}
        poster={item.preview}
        controls
        playsInline
        muted
        autoPlay={true}
        loop={false}
      />
    </div>
  );
}

function ImageSlide({ item }: { item: Screenshot }) {
  return (
    <div className="w-full h-full bg-black" style={{ aspectRatio: "16/9" }}>
      <img
        src={item.image}
        alt="game media"
        className="w-full h-full object-cover select-none"
        draggable={false}
      />
    </div>
  );
}

const GameSwiperGallery = ({ gameId }: Props) => {
  const {
    data: trailers,
    error: trailersError,
    isLoading: trailersLoading,
  } = useTrailers(gameId);
  const {
    data: screenshots,
    error: screenshotsError,
    isLoading: screenshotsLoading,
  } = useScreenshots(gameId);

  const isLoading = trailersLoading || screenshotsLoading;

  if (isLoading) return null;

  if (trailersError) throw trailersError;
  if (screenshotsError) throw screenshotsError;

  const screenshotsItems: GalleryItem[] = (screenshots?.results ?? []).map(
    (s) => ({
      original: s.image,
      thumbnail: s.image,
      description: "game screenshots",
      originalClass: "bg-black",
      renderItem: () => <ImageSlide item={s} />,
    })
  );

  const trailerItems = trailers?.results;
  let items: GalleryItem[] = screenshotsItems;

  if (trailerItems) {
    trailerItems.forEach((trailer) => {
      const trailerSrc = trailer.data[480];
      const trailerItem: GalleryItem = {
        original: trailer.preview || trailerSrc,
        thumbnail: trailer.preview || trailerSrc,
        description: "game screenshots",
        originalClass: "bg-black",
        renderItem: () => <VideoSlide item={trailer} />,
      };
      items = [trailerItem, ...screenshotsItems];
    });
  }

  return (
    <div className="rounded-2xl overflow-hidden">
      <ImageGallery
        items={items}
        showIndex
        showPlayButton={false}
        showFullscreenButton
        showThumbnails
        slideDuration={350}
        additionalClass="gh-media-gallery"
      />
    </div>
  );
};

export default GameSwiperGallery;
