import { Circle, Heading, HStack, Image, Text } from "@chakra-ui/react";
import ratingMap, { ratingsColorMap } from "../entities/RatingMap";

const RatingBadge = ({
  rating,
  reviewCount,
  ratings,
}: {
  rating: number;
  reviewCount: number;
  ratings: { id: number; title: string; count: number; percent: number }[];
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

      <HStack spacing={6} flexWrap="wrap">
        {[...ratings]
          .sort((a, b) => b.id - a.id)
          .map((r) => {
            const colorInfo = ratingsColorMap[r.id];
            return (
              <HStack key={r.id} spacing={2}>
                <Circle size="10px" bg={colorInfo?.color ?? "gray.500"} />
                <Text fontWeight="bold" textTransform="capitalize">
                  {colorInfo?.title ?? r.title}
                </Text>
                <Text color="gray.400">{r.count}</Text>
              </HStack>
            );
          })}
      </HStack>
    </>
  );
};

export default RatingBadge;
