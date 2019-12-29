import React from "react";
import Menu, { Props } from "./Menu";
import faker from "faker";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

const dummyProps: Props = {
  get menu() {
    let items = new Array(5).fill(0);
    faker.seed(Math.random());
    items = items.map(item => {
      return {
        id: faker.lorem.word(),
        label: faker.lorem.word(),
        icon: faker.lorem.word()
      };
    });

    return items;
  }
};

const menuTestId = "menu";
const menuItemTestId = "menu-item";

test("should have all the menu Items defined", () => {
  const menu = dummyProps.menu;
  const { container, queryByText, queryByTestId, queryAllByTestId } = render(
    <Menu menu={menu} />
  );
  // console.log(menu);
  // console.log(container.innerHTML);
  for (const item of menu) {
    // console.log(item);
    expect(queryByText(item.label)).toBeInTheDocument();
    expect(queryByTestId(item.id)).toBeInTheDocument();
    expect(queryAllByTestId("menu-item")).toHaveLength(menu.length);
  }
});

test("should have first menu item selected by default", () => {
  const { menu } = dummyProps;
  const { queryAllByTestId } = render(<Menu menu={menu} />);

  expect(queryAllByTestId(menuItemTestId)[0]).toHaveClass("selected");
});

test("should select the menu item when clicked on it", () => {
  const { menu } = dummyProps;
  const { queryAllByTestId, container } = render(<Menu menu={menu} />);
  const selectIndex = Math.ceil(Math.random() * 1000) % menu.length;

  const allMenuItems = queryAllByTestId(menuItemTestId);
  // console.log(allMenuItems);
  // console.log(allMenuItems.length);
  // console.log(selectIndex);
  fireEvent.click(allMenuItems[selectIndex]);
  for (let idx = 0; idx < menu.length; idx++) {
    if (idx === selectIndex) {
      expect(allMenuItems[idx]).toHaveClass("selected");
    } else {
      expect(allMenuItems[idx]).not.toHaveClass("selected");
    }
  }
});