import { Box, Flex } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <>
      <Box paddingLeft={2}>
        <GameHeading />
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <PlatformSelector />
          </Box>
          <SortSelector />
        </Flex>
      </Box>
      <GameGrid />
    </>
  );
};

export default HomePage;
