# dashboard

a TV-scale dashboard for GitLab CI

![dashboard screenshot]()

## Usage

Navigate to <https://aelindeman.gitlab.io/dashboard/> and configure the hash string of the URL with:

- `project`: the path to a project, e.g. `aelindeman/dashboard`
- `token`: a [personal access token](https://gitlab.com/profile/personal_access_tokens) to use to talk to the GitLab API
- `host`: _(optional)_ the base URL to a custom GitLab instance; default <https://gitlab.com>

e.g.: `/dashboard/#project=aelindeman/dashboard;token=abcde;host=https://gitlab.com`

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
yarn lint --check
yarn test
yarn start
```
