import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname, isOpen, onClose]);

  return (
    <>
      <NavBar onOpenMenu={onOpen} />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerBody p={4} maxH="100vh">
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box maxW="1440px" mx="auto" px={4} py={4}>
        <ScrollRestoration />
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: `"aside main"`,
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
