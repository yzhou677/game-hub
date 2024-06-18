import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";
import GenreList from "../../src/components/GenreList";
import Genre from "../../src/entities/Genre";
import AllProviders from "../AllProviders";
import { createGenre, deleteGenres } from "../mocks/db";
import { simulateDelay, simulateError } from "../utils";

vi.mock("../../src/hooks/useGenres", async () => {
  const customHookModule = await vi.importActual("../hooks/useGenresForTest");
  return {
    default: customHookModule.useGenresForTest,
  };
});

describe("GenreList", () => {
  const genres: Genre[] = [];
  const names: Set<string> = new Set();
  const duplicates: Genre[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const genre = createGenre();
      if (names.has(genre.name)) {
        duplicates.push(genre);
      } else {
        genres.push(genre);
        names.add(genre.name);
      }
    });
    deleteGenres(duplicates.map((it) => it.id));
  });

  afterAll(() => {
    const genreIds = genres.map((g) => g.id);
    deleteGenres(genreIds);
  });

  const renderComponent = () => {
    render(<GenreList />, { wrapper: AllProviders });

    const getHeading = () => screen.queryByRole("heading", { name: /genres/i });
    const getLoadingSkeleton = () =>
      screen.getByRole("status", { name: "Loading" });

    return {
      getHeading,
      getLoadingSkeleton,
    };
  };

  it("should render a loading spinner when fetching genres", () => {
    simulateDelay("https://api.rawg.io/api/genres");

    const { getLoadingSkeleton } = renderComponent();

    expect(getLoadingSkeleton()).toBeInTheDocument();
  });

  it("should render nothing when fetching genres fails", async () => {
    simulateError("https://api.rawg.io/api/genres");

    const { getHeading, getLoadingSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getLoadingSkeleton);

    expect(getHeading()).not.toBeInTheDocument();
  });

  it("should render heading and a list of genres", async () => {
    const { getHeading, getLoadingSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getLoadingSkeleton);

    expect(getHeading()).toBeInTheDocument();
    genres.forEach((genre) => {
      expect(
        screen.getByRole("button", { name: genre.name })
      ).toBeInTheDocument();
    });
  });

  it("should change fontWeight to bold on button click", async () => {
    const { getLoadingSkeleton } = renderComponent();

    await waitForElementToBeRemoved(getLoadingSkeleton);

    const button = screen.getByRole("button", { name: genres[0].name });
    expect(button).toHaveStyle("font-weight: var(--chakra-fontWeights-normal)");

    const user = userEvent.setup();
    await user.click(button);

    expect(button).toHaveStyle("font-weight: var(--chakra-fontWeights-bold)");
  });
});
