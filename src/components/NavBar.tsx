import {
  Button,
  Grid,
  GridItem,
  Image,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthStore } from "../authstore";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const user = useAuthStore((s) => s.user);
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);
  const logout = useAuthStore((s) => s.logout);

  return (
    <Grid
      templateColumns="auto minmax(0, 1fr) auto"
      alignItems="center"
      gap={4}
      padding="10px"
    >
      <GridItem>
        <Show above="sm">
          <Link to="/">
            <Image
              src={logo}
              boxSize="60px"
              objectFit="cover"
              borderRadius="lg"
            />
          </Link>
        </Show>
      </GridItem>

      <GridItem>
        <SearchInput />
      </GridItem>

      <GridItem>
        {user ? (
          <Stack
            spacing={1}
            direction={{ base: "column", md: "row" }}
            align="flex-end"
          >
            <Text as="span" fontSize="sm" noOfLines={1} mr={3}>
              {user.displayName || user.email}
            </Text>
            <Button size="sm" variant="outline" onClick={logout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Button size="sm" onClick={loginWithGoogle}>
            Login
          </Button>
        )}
      </GridItem>
    </Grid>
  );
};

export default NavBar;
