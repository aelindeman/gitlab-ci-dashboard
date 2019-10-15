import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";
import CheckCircleOutlineRounded from "@material-ui/icons/CheckCircleOutlineRounded";
import ErrorOutlineRounded from "@material-ui/icons/ErrorOutlineRounded";
import HourglassEmptyRounded from "@material-ui/icons/HourglassEmptyRounded";
import PlayCircleOutlineRounded from "@material-ui/icons/PlayCircleOutlineRounded";
import RadioButtonUncheckedRounded from "@material-ui/icons/RadioButtonUncheckedRounded";
import RemoveCircleOutlineRounded from "@material-ui/icons/RemoveCircleOutlineRounded";

export type Status = "created" | "manual" | "pending" | "running" | "success" | "failed" | "skipped" | "canceled";

export const StatusColor = {
  created: indigo[400],
  manual: indigo[400],
  pending: grey[400],
  running: blue[400],
  success: green[400],
  failed: red[400],
  skipped: grey[400],
  canceled: orange[400],
};

export const StatusIcon = {
  created: HourglassEmptyRounded,
  manual: HourglassEmptyRounded,
  pending: HourglassEmptyRounded,
  running: PlayCircleOutlineRounded,
  success: CheckCircleOutlineRounded,
  failed: ErrorOutlineRounded,
  skipped: RadioButtonUncheckedRounded,
  canceled: RemoveCircleOutlineRounded,
};
