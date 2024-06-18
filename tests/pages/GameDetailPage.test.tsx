import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import * as ReactRouterDom from "react-router-dom";
import { vi } from "vitest";
import GameDetailPage from "../../src/pages/GameDetailPage";
import AllProviders from "../AllProviders";
import Game, {
  createGame,
  createGenre,
  createParentPlatform,
  createPublisher,
} from "../mocks/db";
import { simulateDelay, simulateError } from "../utils";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("GameDetailPage", () => {
  let game: Game;
  let slug: string;

  beforeAll(() => {
    game = createGame(
      [createGenre()],
      [createPublisher()],
      [createParentPlatform()]
    );
    slug = game.slug;
  });

  const renderComponent = () => {
    vi.spyOn(ReactRouterDom, "useParams").mockReturnValue({ slug: slug });
    render(<GameDetailPage />, { wrapper: AllProviders });

    const getLoadingSkeleton = () =>
      screen.getByRole("status", { name: "Loading" });
    return {
      getLoadingSkeleton,
    };
  };

  it("should render a loading spinner when fetching game details", () => {
    simulateDelay("https://api.rawg.io/api/games/" + slug);

    const { getLoadingSkeleton } = renderComponent();

    expect(getLoadingSkeleton()).toBeInTheDocument();
  });

  it("should throw error when fetching game details fails", () => {
    simulateError("https://api.rawg.io/api/games/" + slug);
    vi.spyOn(ReactRouterDom, "useParams").mockReturnValue({ slug: slug });
    try {
      render(<GameDetailPage />, { wrapper: AllProviders });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should render heading, description and attributes", async () => {
    const { getLoadingSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getLoadingSkeleton);

    expect(
      screen.getByRole("heading", {
        name: new RegExp(game.name, "i"),
      })
    ).toBeInTheDocument();
    expect(screen.getByText(game.description_raw)).toBeInTheDocument();
    expect(screen.getByText(/platforms/i)).toBeInTheDocument();
    expect(
      screen.getByText(game.parent_platforms[0].platform.name)
    ).toBeInTheDocument();
    expect(screen.getByText(/metascore/i)).toBeInTheDocument();
    expect(screen.getByText(game.metacritic)).toBeInTheDocument();
    expect(screen.getByText(/genres/i)).toBeInTheDocument();
    expect(screen.getByText(game.genres[0].name)).toBeInTheDocument();
    expect(screen.getByText(game.publishers[0].name)).toBeInTheDocument();
  });
});
