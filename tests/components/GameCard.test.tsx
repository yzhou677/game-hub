import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GameCard from "../../src/components/GameCard";
import getCroppedImageUrl from "../../src/services/image-url";
import AllProviders from "../AllProviders";
import Game, {
  ParentPlatform,
  cleanDB,
  createGame,
  createGenre,
  createParentPlatform,
  createPublisher,
} from "../mocks/db";

describe("GameCard", () => {
  let game: Game;

  beforeAll(() => {
    const genre = createGenre();
    const publisher = createPublisher();
    const parentPlatforms: ParentPlatform[] = [];

    ["pc", "playstation", "xbox"].forEach((item) => {
      const parentPlatform = createParentPlatform(item);
      parentPlatforms.push(parentPlatform);
    });

    game = createGame([genre], [publisher], parentPlatforms);
  });

  afterAll(() => {
    cleanDB(game.id);
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <GameCard game={game} />
      </MemoryRouter>,
      { wrapper: AllProviders }
    );
  };

  it("should render the image of the game in game card", () => {
    const imageSrc = getCroppedImageUrl(game.background_image);

    renderComponent();

    const image = screen.getByRole("img", { name: "Game" });
    expect(image).toHaveAttribute("src", imageSrc);
  });

  it("should render platform icons in game card", () => {
    renderComponent();

    const pcIcon = screen.getByTestId("icon-pc");
    expect(pcIcon).toBeInTheDocument();

    const playstationIcon = screen.getByTestId("icon-playstation");
    expect(playstationIcon).toBeInTheDocument();

    const xboxIcon = screen.getByTestId("icon-xbox");
    expect(xboxIcon).toBeInTheDocument();
  });

  it("should render game score in game card", () => {
    renderComponent();

    const badge = screen.getByText(game.metacritic);
    expect(badge).toBeInTheDocument();
  });

  it("should render the game link with correct text and URL", () => {
    renderComponent();

    const link = screen.getByRole("link", { name: game.name });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/games/" + game.slug);
  });

  it("should render an emoji when the rating of the game is greater than 3 in game card", () => {
    renderComponent();

    if (game.rating_top < 3) {
      const emoji = screen.queryByTestId("rating");
      expect(emoji).not.toBeInTheDocument();
    } else {
      const emoji = screen.queryByTestId("rating");
      expect(emoji).toBeInTheDocument();
    }
  });
});
