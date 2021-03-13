import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { DISPLAY_DATE_FORMAT } from '../../../../constants/schemas';
import { handleError } from '../../../../utils/error';
import { setAppPrivacy } from '../../../../services/app';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  details: {
    display: 'flex',
  },
  cardAction: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 110,
    fontSize: theme.spacing(4),
    flexShrink: 0,
    flexGrow: 0,
  },
  typography: { marginTop: theme.spacing(0.5) },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AppInfo = (props: any) => {
  const { className, app, onUpdate, ...rest } = props;

  const classes: any = useStyles();

  const [loading, setLoading] = useState(false);

  const handleAppPrivacyToggle = async () => {
    setLoading(true);
    try {
      await setAppPrivacy(app.name, !app.private);
      await onUpdate();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {app.name}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Total Registrations: ' + app.registrations?.length || 1}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Created Date: '}
              {moment(app.createdAt).format(DISPLAY_DATE_FORMAT)}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Time: '}
              {moment().format('hh:mm A')}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={app.logoUrl}>
            {app.name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <Typography
          className={classes.typography}
          color="textSecondary"
          variant="body1"
        >
          {'Public: '}
          <Switch
            checked={!app.private}
            onChange={handleAppPrivacyToggle}
            disabled={loading}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className={classes.cardAction}>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="outlined"
        >
          Upload Logo
        </Button>
        <Button variant="outlined">Reset Logo</Button>
      </CardActions>
    </Card>
  );
};

AppInfo.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default AppInfo;
