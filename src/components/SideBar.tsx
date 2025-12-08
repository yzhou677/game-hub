import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../authstore";
import { createSections } from "../constants/sidebarSections";
import useGameActions from "../hooks/useGameActions";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

const NavHeadingButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Box key={label} mb={2}>
    <Box
      as="button"
      onClick={onClick}
      _hover={{ color: "gray.300" }}
      cursor="pointer"
    >
      <Heading fontSize="2xl" mb={2} color="white">
        {label}
      </Heading>
    </Box>
  </Box>
);

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGenres();
  const actions = useGameActions();

  const genres = data?.results ?? [];
  const setPreset = useGameQueryStore((s) => s.setPreset);
  const reset = useGameQueryStore((s) => s.reset);
  const activeKey = useGameQueryStore((s) => s.gameQuery.activeKey);
  const isGamesListPage = location.pathname === "/games";

  const user = useAuthStore((s) => s.user);

  const handleGenreClick = (id: number) => {
    setPreset({
      genreId: id,
      activeKey: `genre-${id}`,
    });
    navigate("/games");
  };

  const handleAllGamesClick = () => {
    reset();
    navigate("/games");
  };

  const handleHomeClick = () => {
    reset();
    navigate("/");
  };

  const handleFavoritesClick = () => {
    reset();
    navigate("/favorites");
  };

  const sections = createSections(actions);

  if (error) return null;
  if (isLoading) return <Spinner role="status" aria-label="Loading" />;
  return (
    <Box>
      <NavHeadingButton label="Home" onClick={handleHomeClick} />

      {user && (
        <NavHeadingButton label="My Favorites" onClick={handleFavoritesClick} />
      )}

      <NavHeadingButton label="All games" onClick={handleAllGamesClick} />

      <Divider my={3} opacity={0.2} />

      {/* New Releases / Top */}
      {sections.map((sec, idx) => (
        <Box key={sec.title} mt={idx ? 6 : 0}>
          <Heading fontSize="2xl" mb={3} color="white">
            {sec.title}
          </Heading>
          <List>
            {sec.items.map(({ key, label, icon, onClick }) => {
              const active = isGamesListPage && activeKey === key;
              return (
                <ListItem key={key} py="6px">
                  <HStack>
                    <Icon
                      as={icon}
                      boxSize={6}
                      color={active ? "blue.300" : "gray.300"}
                    />
                    <Button
                      variant="link"
                      fontSize="lg"
                      whiteSpace="normal"
                      textAlign="left"
                      color={active ? "blue.300" : "gray.200"}
                      fontWeight={active ? "bold" : "normal"}
                      _hover={{ color: "blue.200" }}
                      onClick={onClick}
                    >
                      {label}
                    </Button>
                  </HStack>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}

      <Divider my={6} opacity={0.2} />

      {/* Genres */}
      <Box mt={5}>
        <Heading fontSize="2xl" mb={3} color="white">
          Genres
        </Heading>
        <List>
          {genres.map((g) => {
            const active = isGamesListPage && activeKey === `genre-${g.id}`;
            return (
              <ListItem key={g.id} py="5px">
                <HStack>
                  <Image
                    boxSize="32px"
                    borderRadius={8}
                    objectFit="cover"
                    src={getCroppedImageUrl(g.image_background)}
                    alt={g.name}
                  />
                  <Button
                    variant="link"
                    fontSize="lg"
                    whiteSpace="normal"
                    textAlign="left"
                    color={active ? "blue.300" : "gray.200"}
                    fontWeight={active ? "bold" : "normal"}
                    _hover={{ color: "blue.200" }}
                    onClick={() => handleGenreClick(g.id)}
                  >
                    {g.name}
                  </Button>
                </HStack>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
