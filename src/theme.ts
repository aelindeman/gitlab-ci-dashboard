import createPalette from "@material-ui/core/styles/createPalette";
import createTypography from "@material-ui/core/styles/createTypography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { blueGrey, teal } from "@material-ui/core/colors";
import createSpacing from "@material-ui/core/styles/createSpacing";

export const palette = createPalette({
  type: "dark",
  primary: {
    main: teal[300],
  },
  secondary: {
    main: blueGrey[300],
  },
});

export const typography = createTypography(palette, {
  fontSize: 18,
});

export const spacing = createSpacing(2);

export default createMuiTheme({
  palette,
  spacing,
  typography,
  overrides: {
    MuiChip: {
      root: {
        borderRadius: typography.fontSize + spacing(),
        height: undefined,
        paddingTop: spacing(),
        paddingRight: spacing() / 2,
        paddingBottom: spacing(),
        paddingLeft: spacing() / 2,
      },
    },
    MuiList: {
      padding: {
        paddingTop: spacing() / 2,
      },
    },
    MuiListSubheader: {
      root: {
        lineHeight: undefined,
      },
    },
  },
});
