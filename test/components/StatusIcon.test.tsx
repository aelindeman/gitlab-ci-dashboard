import createRender from "@material-ui/core/test-utils/createRender";
import React from "react";
import StatusIcon from "../../src/components/StatusIcon";
import { Statuses } from "../../src/status";

describe("<StatusIcon />", () => {
  const muiRender = createRender();

  describe.each(Statuses)("with status %s", status => {
    it("should render without crashing ", () => {
      expect(() => muiRender(<StatusIcon status={status} />)).not.toThrow();
    });
  });
});
