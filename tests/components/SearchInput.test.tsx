import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import SearchInput from "../../src/components/SearchInput";
import AllProviders from "../AllProviders";

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("SearchInput", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>,
      { wrapper: AllProviders }
    );

    return {
      searchInput: () => screen.getByPlaceholderText(/Search games.../i),
    };
  };

  it("should render form fields", () => {
    const { searchInput } = renderComponent();

    expect(searchInput()).toBeInTheDocument();
  });

  it("should call onSubmit when user hits enter", async () => {
    const { searchInput } = renderComponent();

    const user = userEvent.setup();
    await user.type(searchInput(), "Mario{enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
