import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Emoji from "../../src/components/Emoji";

describe("Emoji", () => {
  it("should not render an emoji for ratings less than 3", () => {
    render(<Emoji rating={2} />);
    const emoji = screen.queryByRole("img");
    expect(emoji).not.toBeInTheDocument();
  });

  it("should render correct emoji for rating 3", () => {
    render(<Emoji rating={3} />);
    const emoji = screen.getByRole("img");
    expect(emoji).toHaveAttribute("alt", "meh");
  });

  it("should render correct emoji for rating 4", () => {
    render(<Emoji rating={4} />);
    const emoji = screen.getByRole("img");
    expect(emoji).toHaveAttribute("alt", "recommended");
  });

  it("should render correct emoji for rating 5", () => {
    render(<Emoji rating={5} />);
    const emoji = screen.getByRole("img");
    expect(emoji).toHaveAttribute("alt", "exceptional");
  });
});
