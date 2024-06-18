import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";
import PlatformSelector from "../../src/components/PlatformSelector";
import Platform from "../../src/entities/Platform";
import AllProviders from "../AllProviders";
import { createPlatform, deletePlatforms } from "../mocks/db";
import { simulateError } from "../utils";

vi.mock("../../src/hooks/usePlatforms", async () => {
  const customHookModule = await vi.importActual(
    "../hooks/usePlatformsForTest"
  );
  return {
    default: customHookModule.usePlatformsForTest,
  };
});

describe("PlatformSelector", () => {
  const platforms: Platform[] = [];
  const names: Set<string> = new Set();
  const duplicates: Platform[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const platform = createPlatform();
      if (names.has(platform.name)) {
        duplicates.push(platform);
      } else {
        platforms.push(platform);
        names.add(platform.name);
      }
    });
    deletePlatforms(duplicates.map((it) => it.id));
  });

  afterAll(() => {
    const platformIds = platforms.map((g) => g.id);
    deletePlatforms(platformIds);
  });

  const renderComponent = () => {
    render(<PlatformSelector />, { wrapper: AllProviders });
  };

  it("should render nothing when fetching platforms fails", async () => {
    simulateError("https://api.rawg.io/api/platforms/lists/parents");

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByText("Platforms"));
    expect(screen.queryByText("Platforms")).not.toBeInTheDocument();
  });

  it("should render default button label when no platform is selected", async () => {
    renderComponent();

    const menuButton = await screen.findByTestId("plselected");
    expect(menuButton).toHaveTextContent("Platforms");
  });

  it("should render a list of platforms", async () => {
    renderComponent();

    platforms.forEach(async (platform) => {
      expect(await screen.findByText(platform.name)).toBeInTheDocument();
    });
  });

  it("should render menu button label as selected menu item", async () => {
    renderComponent();

    const menuButton = await screen.findByTestId("plselected");
    const user = userEvent.setup();
    await user.click(menuButton);

    const menuItem = screen.getByText(platforms[0].name);
    await user.click(menuItem);

    expect(menuButton).toHaveTextContent(platforms[0].name);
  });
});
