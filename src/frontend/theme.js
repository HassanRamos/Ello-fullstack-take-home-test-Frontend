import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: {
    turquoise: "#5ACCCC",
    white: "#FFFFFF",
    steelBlue: "#335C6E",
    yellow: "#FABD33",
  },
  secondary: {
    lightTurquoise: "#CFFAFA",
    orangeRed: "#F76434",
    teal: "#4AA088",
    darkYellow: "#FAAD00",
    darkTurquoise1: "#53C2C2",
    orangePastel: "#FFE6DC",
    darkTurquoise2: "#28B8B8",
  },
};

export const typography = {
  fontFamily: "'Mulish', sans-serif",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.turquoise,
    },
    secondary: {
      main: colors.primary.steelBlue,
    },
    white: {
      main: colors.primary.white,
    },
    yellow: {
      main: colors.primary.yellow,
    },
    lightTurquoise: {
      main: colors.secondary.lightTurquoise,
    },
    orangeRed: {
      main: colors.secondary.orangeRed,
    },
    teal: {
      main: colors.secondary.teal,
    },
    darkYellow: {
      main: colors.secondary.darkYellow,
    },
    darkTurquoise1: {
      main: colors.secondary.darkTurquoise1,
    },
    orangePastel: {
      main: colors.secondary.orangePastel,
    },
    darkTurquoise2: {
      main: colors.secondary.darkTurquoise2,
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
  },
});

export default theme;
