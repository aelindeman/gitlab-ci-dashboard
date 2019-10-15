# dashboard

a TV-scale dashboard for GitLab CI

![dashboard screenshot]()

## Usage

- project: the path to a project, e.g. `aelindeman/dashboard`
- token: a [personal access token](https://gitlab.com/profile/personal_access_tokens) to use to talk to the GitLab API
- host: *(optional)* the base URL to a custom GitLab instance; default <https://gitlab.com>

## Contributing

Dashboard is built using:

- Typescript
- React
- Material UI
- webpack

It is tested using:

- Jest
- Enzyme
- webpack

```
yarn install
yarn lint
yarn test
yarn start && open http://localhost:8080
```