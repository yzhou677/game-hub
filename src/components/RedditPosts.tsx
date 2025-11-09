import { Box, Heading, Spinner, VStack } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useRedditPosts from "../hooks/useRedditPosts";
import RedditPostCard from "./RedditPostCard";

const RedditPosts = ({ id }: { id: number }) => {
  const { data, error, fetchNextPage, hasNextPage } = useRedditPosts(id);
  if (error) return;

  const posts = data?.pages.flatMap((p) => p.results) ?? [];
  if (posts.length <= 0) return;

  const fetchedGamesCount = posts.length;

  return (
    <Box>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        Posts from Subreddit
      </Heading>
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <VStack spacing={6} align="stretch">
          {posts.map((p) => {
            return <RedditPostCard redditPost={p} key={p.id} />;
          })}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
};

export default RedditPosts;
