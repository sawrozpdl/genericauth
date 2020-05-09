import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typographies from './typography';
import overrides from './overrides';

const typography: any = typographies;

const theme = createMuiTheme({
  palette,
  overrides,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
