import "@testing-library/jest-dom";
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../../src/pages/HomePage";
import useGameQueryStore from "../../src/store";
import AllProviders from "../AllProviders";
import Game, {
  cleanDB,
  createGame,
  createGenre,
  createParentPlatform,
  createPublisher,
} from "../mocks/db";

describe("HomePage", () => {
  const games: Game[] = [];

  beforeAll(() => {
    for (let i = 0; i < 20; i++) {
      games.push(
        createGame(
          [createGenre()],
          [createPublisher()],
          [createParentPlatform()]
        )
      );
    }

    mockGamesWithSamePlatformAndGenre();
  });

  afterAll(() => {
    games.forEach((game) => {
      cleanDB(game.id);
    });
  });

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useGameQueryStore.setState({});
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
      { wrapper: AllProviders }
    );

    const getGenreListLoadingSkeleton = () =>
      screen.getByRole("status", { name: "Loading" });
    return {
      getGenreListLoadingSkeleton,
    };
  };

  it("should render all components correctly", async () => {
    mockMatchMedia(true);
    renderComponent();

    expect(await screen.findByTestId("plselected")).toHaveTextContent(
      "Platforms"
    );
    expect(
      await screen.findByRole("heading", { name: /games/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /genres/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Relevance")).toBeInTheDocument();
  });

  it("should not render genre list when screen size is below lg", async () => {
    mockMatchMedia(false);
    renderComponent();

    expect(await screen.findByTestId("plselected")).toHaveTextContent(
      "Platforms"
    );
    expect(
      await screen.findByRole("heading", { name: /games/i })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /genres/i })
      ).not.toBeInTheDocument();
    });
    expect(screen.getByText("Relevance")).toBeInTheDocument();
  });

  it("should render correct games with the corresponding platform and genre selected", async () => {
    mockMatchMedia(true);
    const { getGenreListLoadingSkeleton } = renderComponent();
    await waitForElementToBeRemoved(getGenreListLoadingSkeleton);

    const platformSelected = games[20].parent_platforms[0].platform.name;
    const genreSelected = games[21].genres[0].name;

    const platformMenuButton = await screen.findByTestId("plselected");
    const user = userEvent.setup();
    await user.click(platformMenuButton);

    const platformMenuItem = screen.getByText(platformSelected);
    await user.click(platformMenuItem);

    const genreItemButton = screen.getByRole("button", {
      name: genreSelected,
    });
    await user.click(genreItemButton);

    expect(await screen.findByText(games[20].name)).toBeInTheDocument();
    expect(await screen.findByText(games[21].name)).toBeInTheDocument();
    expect(await screen.findByText(games[22].name)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: new RegExp(platformSelected, "i"),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: new RegExp(genreSelected, "i"),
      })
    ).toBeInTheDocument();
  });

  const mockGamesWithSamePlatformAndGenre = () => {
    const initialLength = games.length;
    const genre = createGenre("action");
    const platform = createParentPlatform("xbox");

    for (let i = initialLength; i < initialLength + 3; i++) {
      games[i] = createGame([genre], [createPublisher()], [platform]);
    }
  };
});

const mockMatchMedia = (matches) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

vi.mock("../../src/hooks/usePlatforms", async () => {
  const customHookModule = await vi.importActual(
    "../hooks/usePlatformsForTest"
  );
  return {
    default: customHookModule.usePlatformsForTest,
  };
});

vi.mock("../../src/hooks/useGenres", async () => {
  const customHookModule = await vi.importActual("../hooks/useGenresForTest");
  return {
    default: customHookModule.useGenresForTest,
  };
});
