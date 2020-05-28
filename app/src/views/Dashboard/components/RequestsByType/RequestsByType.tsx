import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';

import events from '../../../../constants/events';
import GenericMoreButton from '../../../../components/GenericMoreButton';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: '250px',
  },
  stats: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  requestType: {
    padding: theme.spacing(2),
  },
  requestTypeIcon: {
    color: theme.palette.icon,
  },
}));

const RequestsByType = (props: any) => {
  const { className, app, ...rest } = props;

  const classes = useStyles();
  const theme: any = useTheme();

  const intialData = {
    GET: 0,
    POST: 0,
    PUT: 0,
    DELETE: 0,
  };

  const { events: requests } = app;

  const requestsCount: number = requests.length;

  const getMethod = (action: string): string => events[action].split(':')[1];

  const filteredRequests: object = requests.reduce((acc: any, curr: any) => {
    const currMethod = getMethod(curr.action);
    acc[currMethod] += 1;
    return acc;
  }, intialData);

  const filteredRequestsData = Object.values(
    filteredRequests
  ).map((data: number) => ((data * 100) / requestsCount).toFixed(1));

  const data = {
    datasets: [
      {
        data: filteredRequestsData,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.background.default,
        hoverBorderColor: theme.palette.background.default,
      },
    ],
    labels: ['GET', 'POST', 'PUT', 'DELETE'],
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        label(tooltipItem: any, _data: any): string {
          const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];

          return `${label}: ${value}%`;
        },
      },
    },
  };

  const requestTypes = [
    {
      title: 'GET',
      value: filteredRequestsData[0],
      color: theme.palette.primary.main,
    },
    {
      title: 'POST',
      value: filteredRequestsData[1],
      color: theme.palette.info.main,
    },
    {
      title: 'PUT',
      value: filteredRequestsData[2],
      color: theme.palette.warning.main,
    },
    {
      title: 'DELETE',
      value: filteredRequestsData[3],
      color: theme.palette.error.main,
    },
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Requests By Type" action={<GenericMoreButton />} />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {requestTypes.map((requestType) => (
            <div className={classes.requestType} key={requestType.title}>
              <Typography variant="h4">{requestType.title}</Typography>
              <Typography style={{ color: requestType.color }} variant="h3">
                {requestType.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

RequestsByType.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default RequestsByType;
