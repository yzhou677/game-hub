import { Avatar, Box, Heading, HStack, Link, Text } from "@chakra-ui/react";
import RedditPost from "../entities/RedditPost";
import { formatDate, formatLongText, stripHtml } from "../utils/format";

interface Props {
  redditPost: RedditPost;
}

const RedditPostCard = ({ redditPost }: Props) => {
  const limit = 400;

  const {
    name: title,
    text: body,
    username: author,
    created: created,
    url: href,
  } = redditPost;

  let context = stripHtml(body);
  context = context.length > limit ? formatLongText(limit, context) : context;

  return (
    <Link href={href} _hover={{ textDecoration: "none" }} w="100%" maxW="100%">
      <Box
        bg="blackAlpha.600"
        border="1px solid"
        borderColor="whiteAlpha.200"
        rounded="xl"
        p={6}
        shadow="xl"
        w="100%"
        maxW="100%"
        overflowX="hidden"
      >
        <HStack justify="space-between" mb={3} maxW="100%">
          <Heading
            size="lg"
            color="white"
            wordBreak="break-word"
            minW={0}
            maxW="100%"
          >
            {title}
          </Heading>
        </HStack>

        {body && (
          <Text
            color="whiteAlpha.800"
            mb={3}
            wordBreak="break-word"
            minW={0}
            maxW="100%"
          >
            {context}
          </Text>
        )}

        <HStack justify="space-between" mb={3} spacing={3} flexWrap="wrap">
          <HStack spacing={2}>
            <Avatar name={author} size="sm" />
            <Text color="whiteAlpha.700">{author}</Text>
          </HStack>
          <Text color="whiteAlpha.500">{formatDate(created)}</Text>
        </HStack>
      </Box>
    </Link>
  );
};

export default RedditPostCard;
