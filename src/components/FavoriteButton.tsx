import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Game from "../entities/Game";
import useFavorite from "../hooks/useFavorite";

interface Props {
  game: Game;
  size?: "sm" | "md";
}

const FavoriteButton = ({ game, size = "sm" }: Props) => {
  const { user, isFavorite, toggleFavorite } = useFavorite(game);

  // 没登录就不显示按钮
  if (!user) return null;

  return (
    <IconButton
      aria-label="favorite"
      size={size}
      icon={
        isFavorite ? <FaHeart color="white" /> : <FaRegHeart color="white" />
      }
      bg="blackAlpha.600"
      _hover={{ bg: "blackAlpha.700" }}
      borderRadius="full"
      onClick={toggleFavorite}
    />
  );
};

export default FavoriteButton;
