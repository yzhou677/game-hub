import "@testing-library/jest-dom";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import {
  cleanDB,
  createGame,
  createGenre,
  createParentPlatform,
  createPublisher,
  db,
} from "./mocks/db";
import { navigateTo } from "./utils";

describe("Router", () => {
  let gameId: number;

  const expectNavBarInTheDocument = () => {
    expect(screen.getByPlaceholderText(/search games/i)).toBeInTheDocument();
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  };

  beforeAll(() => {
    const game = createGame(
      [createGenre()],
      [createPublisher()],
      [createParentPlatform()]
    );
    gameId = game.id;
  });

  afterAll(() => {
    cleanDB(gameId);
  });

  it("should render the home page for /", () => {
    navigateTo("/");

    expectNavBarInTheDocument();
    expect(screen.getByRole("heading", { name: /games/i })).toBeInTheDocument();
  });

  it("should render the game detail page for /games/:slug", async () => {
    const game = db.game.findFirst({ where: { id: { equals: gameId } } });
    navigateTo("/games/" + game!.slug);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expectNavBarInTheDocument();
    expect(
      screen.getByRole("heading", { name: game!.name })
    ).toBeInTheDocument();
  });

  it("should render the error page for invalid url", () => {
    navigateTo("/NotFound");

    expectNavBarInTheDocument();
    expect(screen.getByText(/page does not exist/i)).toBeInTheDocument();
  });
});
