import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Button, Divider } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { interpolate } from '../../../../utils/string';
import routes from '../../../../constants/routes';
import GenericTable from '../../../../components/GenericTable';
import getColumns from '../../../History/columns';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const RecentEvents = (props: any) => {
  const { className, history, app, ...rest } = props;

  const classes: any = useStyles();

  const { users, events, name: appName } = app;

  const filteredEvents = events
    .filter((event: any) => event.producer && event.consumer)
    .sort((a: any, b: any) =>
      a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
    );

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button color="primary" size="small" variant="outlined">
            Refresh
          </Button>
        }
        title="Recent Events"
      />
      <Divider />
      <GenericTable
        data={filteredEvents
          .slice(Math.max(filteredEvents.length - 6, 0))
          .reverse()}
        columns={getColumns(appName, users, false)}
        selection={false}
      >
        <Button
          color="primary"
          size="small"
          variant="text"
          onClick={() =>
            history.push(interpolate(routes.HISTORY, { appName: app.name }))
          }
        >
          View all <ArrowRightIcon />
        </Button>
      </GenericTable>
    </Card>
  );
};

RecentEvents.propTypes = {
  className: PropTypes.string,
};

export default RecentEvents;
