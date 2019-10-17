import { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";
import { Status, StatusIcon as StatusIconComponent } from "../status";

interface StatusIconProps extends SvgIconProps {
  status: Status;
}

const StatusIcon: React.FC<StatusIconProps> = (props: StatusIconProps) => {
  const { status, ...iconProps } = props;
  return React.createElement(StatusIconComponent[status], { ...iconProps });
};

export default StatusIcon;
