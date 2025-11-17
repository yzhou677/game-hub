import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SortSelector, { sortOrders } from "../../src/components/SortSelector";
import AllProviders from "../AllProviders";

describe("SortSelector", () => {
  const renderComponent = () => {
    render(<SortSelector />, { wrapper: AllProviders });
  };

  it("should render default button label when no order is selected", () => {
    renderComponent();

    const menuButton = screen.getByTestId("sortselected");
    expect(menuButton).toHaveTextContent("Relevance");
  });

  it("should render a list of orders", () => {
    renderComponent();

    sortOrders.forEach((orderItem) => {
      expect(screen.queryByText(orderItem.label)).toBeInTheDocument();
    });
  });

  it("should render menu button label as selected menu item", async () => {
    renderComponent();

    const menuButton = screen.getByTestId("sortselected");
    const user = userEvent.setup();
    await user.click(menuButton);

    const menuItem = screen.getByText(sortOrders[1].label);
    await user.click(menuItem);

    expect(menuButton).toHaveTextContent(sortOrders[1].label);
  });
});
