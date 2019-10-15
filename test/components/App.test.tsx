import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import App from "../../src/components/App";

describe("App", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should use a color scheme", () => {
    expect(wrapper.find(CssBaseline).exists()).toBe(true);
    expect(wrapper.find(ThemeProvider).exists()).toBe(true);
    expect(wrapper.find(ThemeProvider).prop("theme")).toBeDefined();
  });
});
