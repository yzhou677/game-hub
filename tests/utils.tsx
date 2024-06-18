import { render } from "@testing-library/react";
import { HttpResponse, delay, http } from "msw";
import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../src/routes";
import AllProviders from "./AllProviders";
import { server } from "./mocks/server";

export const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(<RouterProvider router={router} />, {
    wrapper: AllProviders,
  });
};

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
};

export const simulateError = (endpoint: string): void => {
  server.use(
    http.get(endpoint, () => {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    })
  );
};
