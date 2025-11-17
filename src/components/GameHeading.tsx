import { Heading } from "@chakra-ui/react";
import {
  DisplayMode,
  displayModeTitleMap,
} from "../constants/gameDisplayOptions";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useGameQueryStore from "../store";

const isDisplayMode = (k: unknown): k is DisplayMode =>
  typeof k === "string" && k in displayModeTitleMap;

const GameHeading = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(genreId);
  const activeKey = useGameQueryStore((s) => s.gameQuery.activeKey);

  const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const platform = usePlatform(platformId);

  let heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  if (activeKey && isDisplayMode(activeKey))
    heading = `${platform?.name || ""} ${displayModeTitleMap[activeKey]}`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
