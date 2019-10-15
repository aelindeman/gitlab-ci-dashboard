import React from "react";
import _ from "lodash";
import { Gitlab, ProjectId } from "gitlab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles, Theme } from "@material-ui/core/styles";
import Pipeline, { PipelineData } from "./Pipeline";

interface Props {
  api: Gitlab;
  projectId: ProjectId;
}

interface State {
  pipelines?: PipelineData[];
}

const PipelineContainer = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 12),
  },
}))(Box);

export default class Project extends React.Component<Props, State> {
  private refresher?: NodeJS.Timeout;

  public state: State = {
    pipelines: undefined,
  };

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

  public renderListProblem = (text: string) => <Typography>{text}</Typography>;

  public renderPipelines = (pipelines: PipelineData[], projectId: ProjectId) =>
    _.map(pipelines, p => (
      <PipelineContainer key={p.id}>
        <Pipeline api={this.props.api} data={p} projectId={projectId} />
      </PipelineContainer>
    ));

  public render = (): React.ReactNode => {
    const { projectId } = this.props;
    const { pipelines } = this.state;

    if (pipelines && pipelines.length) {
      return this.renderPipelines(pipelines, projectId);
    } else if (pipelines) {
      return this.renderListProblem("Nothing here.");
    } else {
      return this.renderListProblem("Loading...");
    }
  };
}
