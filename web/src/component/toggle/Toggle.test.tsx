import React from "react";
import Toggle, { ToggleProps } from "./Toggle";

import {
  render,
  customRender,
  getByTestId,
  queryByTestId,
  fireEvent,
  waitForDomChange
} from "../../utils/testing";

let testValue: string;

let props: ToggleProps;

beforeEach(function() {
  testValue = "day";
  props = {
    leftIcon: "day",
    rightIcon: "night",
    onChange: (): void => {
      if (testValue === "day") {
        testValue = "night";
      } else {
        testValue = "day";
      }
    }
  };
});

test("should have left and right icon Elements if supplied", function() {
  const { getByTestId, container } = render(<Toggle {...props} />);

  // console.log(container.innerHTML);
  //expect(await xFindAllByClassName("injected-svg")).toBeInTheDocument();
  expect(getByTestId("left")).toBeInTheDocument();
  expect(getByTestId("toggle")).toBeInTheDocument();
  expect(getByTestId("toggle-action")).toBeInTheDocument();
  expect(getByTestId("right")).toBeInTheDocument();

  //   expect(errorSpy).toHaveBeenCalled();
  //expect(getByTestId("right").getElementsByTagName("svg")).toHaveLength(1);
});

test("should not have left or right if props is not provided", () => {
  const { queryByTestId } = render(<Toggle onChange={props.onChange} />);

  expect(queryByTestId("left")).toBeNull();
  expect(queryByTestId("toggle")).toBeInTheDocument();
  expect(queryByTestId("toggle-action")).toBeInTheDocument();
  expect(queryByTestId("right")).toBeNull();
});

test("should fire on change correctly whenver switch is being done.", () => {
  const prevTestValue = testValue;
  const { getByTestId } = render(<Toggle {...props} />);

  const switcher = getByTestId("toggle-action");
  fireEvent.click(switcher);
  //   console.log(testValue);
  expect(testValue).not.toBe(prevTestValue);

  //firEvent once more to check if value changes again
  fireEvent.click(switcher);
  expect(testValue).toStrictEqual(prevTestValue);
});
