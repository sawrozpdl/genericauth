import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme } from '../theme/create';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { restoreSettings } from './settings';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogContent, DialogActions, DialogTitle } from '../components/Modal';
import { DialogContentText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  btnContainer: {
    justifyContent: 'space-between',
  },
}));

interface AlertInterface {
  title: string;
  message: string;
  onOk: Function;
  onCancel?: Function;
}

const Alert: React.FC<AlertInterface> = (props: AlertInterface) => {
  const { title, message, onOk, onCancel } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(restoreSettings())}>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-slide-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.btnContainer}>
            {' '}
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
                if (onCancel) onCancel();
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                onOk();
                handleClose();
              }}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

const ALERT_ID = 'This1eis500jd';

const getFreshElement = (): HTMLSpanElement => {
  let element = document.getElementById(ALERT_ID);
  if (element) {
    element.parentNode?.removeChild(element);
  }
  element = document.createElement('span');
  element.setAttribute('id', ALERT_ID);
  document.getElementById('root')?.appendChild(element);
  return element;
};

const alert = (
  title: string,
  message: string,
  onOk: Function,
  onCancel?: Function
): void => {
  ReactDOM.render(
    <Alert
      title={title}
      message={message}
      onOk={onOk}
      onCancel={onCancel}
    ></Alert>,
    getFreshElement()
  );
};

export default alert;
