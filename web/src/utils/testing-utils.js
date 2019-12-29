import { queryHelpers, buildQueries } from "@testing-library/dom";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const xQueryAllByClassName = (...args) =>
  queryHelpers.queryAllByAttribute("class", ...args);

const getMultipleError = (c, classValue) =>
  `Found multiple elements with the data-cy attribute of: ${classValue}`;
const getMissingError = (c, classValue) =>
  `Unable to find an element with the data-cy attribute of: ${classValue}`;

const [
  xQueryByClassName,
  xGetAllByClassName,
  xGetByClassName,
  xFindByClassName,
  xFindAllByClassName
] = buildQueries(xQueryAllByClassName, getMultipleError, getMissingError);

export default {
  xQueryByClassName,
  xQueryAllByClassName,
  xGetAllByClassName,
  xGetByClassName,
  xFindByClassName,
  xFindAllByClassName
};
