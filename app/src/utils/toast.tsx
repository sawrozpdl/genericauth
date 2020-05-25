import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createTheme } from '../theme/create';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { restoreSettings } from './settings';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert: React.FC<AlertProps> = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

interface SnackBarInterface {
  type: 'success' | 'error' | 'warning' | 'info' | undefined;
  message: string;
}

const SnackBar: React.FC<SnackBarInterface> = (props: SnackBarInterface) => {
  const { type, message } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(restoreSettings())}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

const TOAST_ID = 'This3dis499jd';

const getFreshElement = (): HTMLSpanElement => {
  let element = document.getElementById(TOAST_ID);
  if (element) {
    element.parentNode?.removeChild(element);
  }
  element = document.createElement('span');
  element.setAttribute('id', TOAST_ID);
  document.getElementById('root')?.appendChild(element);
  return element;
};

const createToast = (
  type: 'success' | 'error' | 'warning' | 'info' | undefined,
  message: string
): void => {
  ReactDOM.render(
    <SnackBar type={type} message={message}></SnackBar>,
    getFreshElement()
  );
};

const success = (message: string): void => createToast('success', message);
const error = (message: string): void => createToast('error', message);
const warning = (message: string): void => createToast('warning', message);
const info = (message: string): void => createToast('info', message);

const toast = { success, error, warning, info };

export default toast;
