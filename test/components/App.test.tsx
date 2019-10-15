import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import App from "../../src/components/App";

describe("App", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should use a color scheme", () => {
    expect(wrapper.find(CssBaseline).exists()).toBe(true);
    expect(wrapper.find(MuiThemeProvider).exists()).toBe(true);
    expect(wrapper.find(MuiThemeProvider).prop("theme")).toBeDefined();
  });
});
