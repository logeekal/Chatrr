import React from "react";
import Avatar from "./Avatar";
import { render } from "@testing-library/react";

test("Full Avatar With image and Label", () => {
  const { getByTestId, getByAltText, getByText } = render(
    <Avatar
      type="full"
      size={50}
      label="hello"
      image="https://picsum.photos/200"
    />
  );
  const image = getByTestId("avatar-image");
  const imageByAlt = getByAltText("hello");
  const label = getByTestId("avatar-label");
  const labelText = getByText("hello");

  expect(image).toBeInTheDocument();
  expect(imageByAlt).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(labelText).toBeInTheDocument();
});

test("Compact Avatar with only", () => {
  const {
    getByTestId,
    getByAltText,
    getByText,
    queryByTestId,
    queryByText
  } = render(
    <Avatar
      type="compact"
      size={50}
      label="hello"
      image="https://picsum.photos/200"
    />
  );
  const image = getByTestId("avatar-image");
  const imageByAlt = getByAltText("hello");

  expect(image).toBeInTheDocument();
  expect(imageByAlt).toBeInTheDocument();
  expect(queryByTestId("avatar-label")).toBeNull();
  expect(queryByText("hello")).toBeNull();
});
