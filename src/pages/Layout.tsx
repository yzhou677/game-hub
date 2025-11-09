import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import GenreList from "../components/GenreList";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box maxW="1440px" mx="auto" px={4} py={4}>
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: `"aside main"`, // 1024px
          }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr",
          }}
        >
          <Show above="lg">
            <GridItem area="aside" paddingX={5}>
              <GenreList />
            </GridItem>
          </Show>
          <GridItem area="main">
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
