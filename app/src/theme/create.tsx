import _ from 'lodash';
import { colors, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';
import THEMES from '../constants/themes';

const baseConfig = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
};

const themeConfigs = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600],
          },
        },
      },
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white,
      },
      primary: {
        main: '#7f78d2',
      },
      secondary: {
        main: '#5850EC',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.REDDY,
    palette: {
      type: 'dark',
      primary: {
        main: '#ff8f00',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#310000',
        paper: '#731010',
      },
    },
    typography: {
      fontFamily: 'Do Hyeon',
    },
    shape: {
      borderRadius: 16,
    },
  },
  {
    name: THEMES.DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
      },
      primary: {
        main: '#bb8082',
      },
      secondary: {
        main: '#f48fb1',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    shadows: strongShadows,
  },
  {
    name: THEMES.COMIC,
    palette: {
      type: 'dark',
      primary: {
        main: '#bd0707',
      },
      secondary: {
        main: '#ffc510',
      },
      background: {
        default: '#4c69f6',
        paper: '#4c94f6',
      },
    },
    typography: {
      body1: {
        fontFamily: 'Roboto',
      },
      fontFamily: 'Bangers',
      caption: {
        fontFamily: 'Do Hyeon',
      },
      overline: {
        fontFamily: 'Do Hyeon',
      },
      body2: {
        fontFamily: 'Roboto',
      },
    },
  },
  {
    name: THEMES.HACKER,
    palette: {
      type: 'dark',
      primary: {
        main: '#0f0',
      },
      background: {
        default: '#111111',
        paper: '#212121',
      },
    },
    typography: {
      fontFamily: 'Open Sans',
      h1: {
        fontFamily: 'Ubuntu Mono',
      },
      h2: {
        fontFamily: 'Ubuntu Mono',
      },
      h3: {
        fontFamily: 'Ubuntu Mono',
      },
      h4: {
        fontFamily: 'Ubuntu Mono',
      },
      h6: {
        fontFamily: 'Ubuntu Mono',
      },
      h5: {
        fontFamily: 'Ubuntu Mono',
      },
      subtitle1: {
        fontFamily: 'Ubuntu Mono',
      },
      subtitle2: {
        fontFamily: 'Ubuntu Mono',
      },
      button: {
        fontFamily: 'Ubuntu Mono',
        fontWeight: 900,
      },
      overline: {
        fontFamily: 'Ubuntu Mono',
      },
    },
    shadows: strongShadows,
  },
];

export function createTheme(settings: any = {}): any {
  let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${settings.theme} is not valid`));
    [themeConfig] = themeConfigs;
  }

  let theme = createMuiTheme(
    _.merge({}, baseConfig, themeConfig, { direction: settings.direction })
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}
