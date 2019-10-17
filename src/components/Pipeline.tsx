import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { Gitlab, PipelineId, ProjectId } from "gitlab";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { Status, StatusColor } from "../status";
import Job, { JobData } from "./Job";
import StatusIcon from "./StatusIcon";

export interface PipelineProps {
  api: Gitlab;
  projectId: ProjectId;
  data: PipelineData;
}

export interface PipelineData {
  id: PipelineId;
  status: Status;
  ref: string;
  sha: string;
  before_sha: string;
  tag: boolean;
  yaml_errors?: boolean;
  user: {
    name: string;
    username: string;
    id: number;
    state: string;
    avatar_url: string;
    web_url: string;
  };
  created_at: string;
  updated_at: string;
  started_at: string;
  finished_at: string;
  committed_at: string;
  duration: number;
  coverage: number;
  web_url: string;
}

export interface PipelineState {
  jobs?: JobData[];
}

export default class Pipeline extends React.Component<
  PipelineProps,
  PipelineState
> {
  private refresher?: NodeJS.Timeout;

  public state: PipelineState = {
    jobs: undefined,
  };

  public componentDidMount = (): void => {
    this.getJobs();
    this.refresher = global.setInterval(this.getJobs, 10000);
  };

  public componentWillUnmount = (): void => {
    if (this.refresher) {
      global.clearInterval(this.refresher);
    }
  };

  public getJobs = (): void => {
    const {
      api,
      data: { id: pipelineId },
      projectId,
    } = this.props;
    api.Pipelines.showJobs(projectId, pipelineId)
      .then(response => {
        this.setState({ jobs: response as JobData[] });
      })
      .catch(console.warn);
  };

  public formatStartedAt = (time: any) => moment(time).fromNow();

  public renderListProblem = (text: string) => (
    <Grid item>
      <Typography color="error">{text}</Typography>
    </Grid>
  );

  public renderStage = (
    jobs: JobData[],
    projectId: ProjectId,
    pipelineId: PipelineId
  ) =>
    _.map(jobs, job => (
      <ListItem key={job.id}>
        <Job projectId={projectId} pipelineId={pipelineId} data={job} />
      </ListItem>
    ));

  public renderJobs = (
    jobs: JobData[],
    projectId: ProjectId,
    pipelineId: PipelineId
  ) =>
    _.map(_.groupBy(jobs, "stage"), (stage, name) => (
      <Grid key={name} item>
        <List dense>
          <ListSubheader disableSticky>{name}</ListSubheader>
          {this.renderStage(stage, projectId, pipelineId)}
        </List>
      </Grid>
    ));

  public render = (): React.ReactNode => {
    const {
      projectId,
      data: { id: pipelineId, ref, status, started_at, user, web_url },
    } = this.props;
    const { jobs } = this.state;
    const color = StatusColor[status];

    return (
      <Grid container>
        <Grid item md={3}>
          <Link
            variant="subtitle2"
            color="secondary"
            style={{ fontWeight: "bold" }}
            href={web_url}
          >
            #{pipelineId}
          </Link>
          <Typography variant="h4" style={{ color }}>
            <StatusIcon status={status} />
            {ref}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {`${status} ${this.formatStartedAt(started_at)}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`pushed by ${user.name}`}
          </Typography>
        </Grid>
        <Grid item md={9}>
          <Grid container>
            {jobs && jobs.length
              ? this.renderJobs(jobs, projectId, pipelineId)
              : this.renderListProblem(jobs ? "No jobs." : "Loading...")}
          </Grid>
        </Grid>
      </Grid>
    );
  };
}
