import {
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthStore } from "../authstore";
import SearchInput from "./SearchInput";

interface Props {
  onOpenMenu?: () => void;
}

const NavBar = ({ onOpenMenu }: Props) => {
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
        <HStack>
          {onOpenMenu && (
            <IconButton
              aria-label="Open menu"
              icon={<GiHamburgerMenu />}
              onClick={onOpenMenu}
              variant="ghost"
              display={{ base: "inline-flex", lg: "none" }}
            />
          )}
          <Show above="lg">
            <Link to="/">
              <Image
                src={logo}
                boxSize="60px"
                objectFit="cover"
                borderRadius="lg"
              />
            </Link>
          </Show>
        </HStack>
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
