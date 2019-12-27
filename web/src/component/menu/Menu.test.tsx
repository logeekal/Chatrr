import React from "react";
import Menu, { Props } from "./Menu";
import faker from "faker";
import { render } from "@testing-library/react";

const dummyProps: Props = {
  menu: Array(5).fill({
    id: faker.lorem.word(),
    label: faker.lorem.word(),
    icon: faker.lorem.word()
  })
};

test("should have all the menu Items defined", () => {
  const { container, queryByText, queryByTestId } = render(
    <Menu menu={dummyProps.menu} />
  );
  console.log(dummyProps);
  //console.log(container.innerHTML);
  for (const item of dummyProps.menu) {
    console.log(item);
    expect(queryByText(item.label)).toBeInTheDocument();
    expect(queryByTestId(item.id)).toBeInTheDocument();
  }
});
