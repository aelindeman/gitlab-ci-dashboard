import React from "react";
import { PipelineId, ProjectId } from "gitlab";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Status, StatusColor } from "../status";
import StatusIcon from "./StatusIcon";

export interface JobProps {
  projectId: ProjectId;
  pipelineId: PipelineId;
  data: JobData;
}

export interface JobData {
  id: number;
  allow_failure: boolean;
  created_at: string;
  started_at: string;
  finished_at: string;
  duration: number;
  name: string;
  ref: string;
  stage: string;
  status: Status;
  tag: boolean;
  web_url: string;
}

const buttonTheme = (status: Status) => (mainTheme: Theme) =>
  createMuiTheme({
    ...mainTheme,
    palette: {
      primary: {
        main: StatusColor[status],
      },
      contrastThreshold: 10,
    },
  });

const label = (name: string, duration: number) => {
  let l = name;
  if (duration > 0) {
    const t = moment
      .duration(duration * 1000)
      .asSeconds()
      .toFixed();
    l += `: ${t}s`;
  }
  return l;
};

const Job: React.FC<JobProps> = (props: JobProps) => {
  const { duration, name, status, web_url } = props.data;
  return (
    <ThemeProvider theme={buttonTheme(status)}>
      <Chip
        clickable
        component="a"
        href={web_url}
        label={label(name, duration)}
        icon={<StatusIcon status={status}/>}
        color="primary"
      />
    </ThemeProvider>
  );
};

export default Job;
