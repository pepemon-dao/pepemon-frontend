import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders sidebar", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sidebar 1/i);
  expect(linkElement).toBeInTheDocument();
});
