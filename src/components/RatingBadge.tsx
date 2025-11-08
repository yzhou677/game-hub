import { Heading, HStack, Image, Text } from "@chakra-ui/react";
import ratingMap from "../entities/RatingMap";

const RatingBadge = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => {
  if (rating < 3) return null;
  const ratingInfo = ratingMap[rating];

  return (
    <>
      <HStack spacing={1.5} align="center">
        <Heading as="h2" size="md" color="white">
          {ratingInfo.label}
        </Heading>
        <Image {...ratingInfo} />
      </HStack>

      <Text
        mt={1}
        fontSize="sm"
        color="whiteAlpha.700"
        letterSpacing="widest"
        textTransform="uppercase"
      >
        {reviewCount} RATINGS
      </Text>
    </>
  );
};

export default RatingBadge;
