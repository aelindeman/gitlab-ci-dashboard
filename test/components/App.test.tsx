import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import createShallow from "@material-ui/core/test-utils/createShallow";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { ShallowWrapper } from "enzyme";
import React from "react";
import App from "../../src/components/App";
import Project from "../../src/components/Project";

describe("<App />", () => {
  const muiShallow = createShallow();
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = muiShallow(<App />);
  });

  it("should use a color scheme", () => {
    expect(wrapper.exists(CssBaseline)).toBe(true);
    expect(wrapper.exists(ThemeProvider)).toBe(true);
    expect(wrapper.find(ThemeProvider).prop("theme")).toBeDefined();
  });

  it("should display a project", () => {
    expect(wrapper.exists(Project)).toBe(true);
  });
});
