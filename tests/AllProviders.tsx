import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import theme from "../src/theme";

const AllProviders = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  // from data layer to ui layer
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
};

export default AllProviders;
