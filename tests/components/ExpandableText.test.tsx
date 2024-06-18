import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const limit = 300;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 300 characters", () => {
    const text = "Short text";

    render(<ExpandableText>{text}</ExpandableText>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate text if longer than 300 characters", () => {
    render(<ExpandableText>{longText}</ExpandableText>);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when Read More button is clicked", async () => {
    render(<ExpandableText>{longText}</ExpandableText>);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse text when Show Less button is clicked", async () => {
    render(<ExpandableText>{longText}</ExpandableText>);
    const readMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(readMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(readMoreButton).toHaveTextContent(/more/i);
  });
});
