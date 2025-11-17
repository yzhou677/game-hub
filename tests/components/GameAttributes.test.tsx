import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import GameAttributes from "../../src/components/GameAttributes";
import Genre from "../../src/entities/Genre";
import Publisher from "../../src/entities/Publisher";
import AllProviders from "../AllProviders";
import Game, {
  ParentPlatform,
  cleanDB,
  createGame,
  createGenre,
  createParentPlatform,
  createPublisher,
} from "../mocks/db";

describe("GameAttributes", () => {
  let game: Game;

  beforeAll(() => {
    const genres: Genre[] = [];
    const parentPlatforms: ParentPlatform[] = [];
    const publishers: Publisher[] = [];

    genres.push(createGenre());
    parentPlatforms.push(createParentPlatform());
    publishers.push(createPublisher());

    game = createGame(genres, publishers, parentPlatforms);
  });

  afterAll(() => {
    cleanDB(game.id);
  });

  const renderComponent = () => {
    render(<GameAttributes game={game} />, { wrapper: AllProviders });
  };

  it("should render game attributes", () => {
    renderComponent();

    expect(
      screen.getByText(game.parent_platforms[0].platform.name)
    ).toBeInTheDocument();

    expect(screen.getByText(game.metacritic)).toBeInTheDocument();

    expect(screen.getByText(game.genres[0].name)).toBeInTheDocument();

    expect(screen.getByText(game.publishers[0].name)).toBeInTheDocument();
  });
});
