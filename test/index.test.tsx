import React from "react";
import { render } from "enzyme";
import App from "../src/components/App";

it("should render without crashing", () => {
  expect(() => render(<App />)).not.toThrow();
});
