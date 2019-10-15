import React from "react";
import { Gitlab } from "gitlab";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import hash from "../hash";
import theme from "../theme";
import Project from "./Project";

interface Config {
  host: string;
  token: string;
  project: string;
}

const getConfig = (): Config => ({
  host: hash.get("host", "https://gitlab.com"),
  token: hash.get("token"),
  project: hash.get("project"),
});

const getApi = (config: Config): Gitlab => {
  const { host, token } = config;
  return new Gitlab({ host, token });
};

const App = (): React.ReactElement => {
  const [config] = React.useState(getConfig());
  const [api] = React.useState(getApi(config));

  // todo: handle window.hashChange event to update config and api

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Project projectId={config.project} api={api} />
    </ThemeProvider>
  );
};

export default App;
