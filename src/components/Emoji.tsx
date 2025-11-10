import { Image } from "@chakra-ui/react";
import ratingMap from "../entities/RatingMap";

interface Props {
  rating: number;
}
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  return <Image {...ratingMap[rating]} marginTop={1} data-testid="rating" />;
};

export default Emoji;
