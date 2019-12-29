import customQueries from "./testing-utils";
import { render, queries } from "@testing-library/react";

export const customRender = (ui, options) => {
  return render(ui, { queries: { ...queries, ...customQueries }, ...options });
};

export * from "@testing-library/react";
