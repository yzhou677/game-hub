import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import CriticScore from "../../src/components/CriticScore";
import AllProviders from "../AllProviders";

describe("CriticScore", () => {
  it("should render the score", () => {
    render(<CriticScore score={88} />, { wrapper: AllProviders });
    expect(screen.getByText("88")).toBeInTheDocument();
  });

  it("should apply green color scheme for scores above 75", () => {
    render(<CriticScore score={76} />, { wrapper: AllProviders });

    const badge = screen.getByText("76");
    expect(badge).toHaveClass("chakra-badge");
    expect(badge).toHaveAttribute("data-testid", "green");
  });

  it("should apply the yellow color scheme for scores between 61 and 75", () => {
    render(<CriticScore score={70} />, { wrapper: AllProviders });

    const badge = screen.getByText("70");
    expect(badge).toHaveClass("chakra-badge");
    expect(badge).toHaveAttribute("data-testid", "yellow");
  });

  it("should apply no specific color scheme for scores 60 or below", () => {
    render(<CriticScore score={55} />, { wrapper: AllProviders });

    const badge = screen.getByText("55");
    expect(badge).toHaveClass("chakra-badge");
    expect(badge).toHaveAttribute("data-testid", "");
  });
});
