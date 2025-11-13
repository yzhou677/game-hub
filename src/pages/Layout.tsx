import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box maxW="1440px" mx="auto" px={4} py={4}>
        <ScrollRestoration />
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
              <SideBar />
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
