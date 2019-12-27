import React from "react";
import { render } from "@testing-library/react";
import MenuItem, { Props } from "./MenuItem";

const menuItems: Array<Props> = [
  {
    menuItem: {
      icon: "rooms",
      id: "Room2",
      label: "room"
    },
    current: false
  },
  {
    menuItem: {
      icon: "chat",
      id: "chat",
      label: "chats"
    },
    current: true
  }
];

test("should generate appropriate menu Item which is non Selected", () => {
  const nonSelectedCandidate = menuItems[0];
  const { queryByTestId, queryByText, baseElement } = render(
    <MenuItem {...nonSelectedCandidate} />
  );

  expect(queryByTestId(nonSelectedCandidate.menuItem.id)).toBeInTheDocument();
  expect(baseElement.classList.contains("selected")).toBeFalsy();
  expect(queryByText(nonSelectedCandidate.menuItem.label)).toBeInTheDocument();
});

test("should generate appropriate menu Item which is Selected", () => {
  const selectedCandidate = menuItems[1];
  const { queryByTestId, queryByText, baseElement, container } = render(
    <MenuItem {...selectedCandidate} />
  );

  expect(queryByTestId(selectedCandidate.menuItem.id)).toBeInTheDocument();
  expect(container.firstChild).toHaveClass("selected");
  expect(queryByText(selectedCandidate.menuItem.label)).toBeInTheDocument();
});
