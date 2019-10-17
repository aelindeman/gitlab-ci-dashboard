import createRender from "@material-ui/core/test-utils/createRender";
import React from "react";
import StatusIcon from "../../src/components/StatusIcon";
import { Status } from "../../src/status";

describe("<StatusIcon />", () => {
  const muiRender = createRender();
  const statuses: Status[] = [
    "created",
    "manual",
    "pending",
    "running",
    "success",
    "failed",
    "skipped",
    "canceled",
  ]

  describe.each(statuses)("with status %s", status => {
    it("should render without crashing ", () => {
      expect(() => muiRender(<StatusIcon status={status} />)).not.toThrow();
    });
  });
});
