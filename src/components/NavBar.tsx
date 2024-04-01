import { HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Show above="sm">
        <Link to="/">
          <Image src={logo} boxSize="60px" objectFit="cover" />
        </Link>
      </Show>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
