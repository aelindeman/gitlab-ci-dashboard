import Box from "@material-ui/core/Box";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Gitlab, ProjectId } from "gitlab";
import _ from "lodash";
import React from "react";
import Pipeline, { PipelineData } from "./Pipeline";

interface ProjectProps {
  api: Gitlab;
  projectId: ProjectId;
}

interface ProjectState {
  pipelines?: PipelineData[];
}

const PipelineContainer = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 12),
  },
}))(Box);

export default class Project extends React.Component<
  ProjectProps,
  ProjectState
> {
  private refresher?: NodeJS.Timeout;

  public state: ProjectState = {};

  public componentDidMount = (): void => {
    this.getPipelines();
    this.refresher = global.setInterval(this.getPipelines, 10000);
  };

  public componentWillUnmount = (): void => {
    if (this.refresher) {
      global.clearInterval(this.refresher);
    }
  };

  public getPipelines = (): void => {
    const { api, projectId } = this.props;
    api.Pipelines.all(projectId, { maxPages: 1 })
      .then(response =>
        Promise.all(
          (response as PipelineData[]).map(({ id: pipelineId }) =>
            api.Pipelines.show(projectId, pipelineId)
          )
        ).then(pipelines =>
          this.setState({ pipelines: pipelines as PipelineData[] })
        )
      )
      .catch(console.warn);
  };

  public renderListProblem = (text: string) => (
    <Typography color="error">{text}</Typography>
  );

  public renderPipelines = (pipelines: PipelineData[], projectId: ProjectId) =>
    _.map(pipelines, p => (
      <PipelineContainer key={p.id}>
        <Pipeline api={this.props.api} data={p} projectId={projectId} />
      </PipelineContainer>
    ));

  public render = (): React.ReactNode => {
    const { projectId } = this.props;
    const { pipelines } = this.state;
    return pipelines && pipelines.length
      ? this.renderPipelines(pipelines, projectId)
      : this.renderListProblem(pipelines ? "Nothing here." : "Loading...");
  };
}
