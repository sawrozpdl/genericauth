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

import InputIcon from '@material-ui/icons/Input';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: '250px',
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  requestType: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  requestTypeIcon: {
    color: theme.palette.icon,
  },
}));

const RequestsByType = (props: any) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme: any = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 22, 18, 12],
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
        label(tooltipItem: any, _data: any) {
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
      value: '63',
      icon: <GetAppIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: 'POST',
      value: '22',
      icon: <PostAddIcon />,
      color: theme.palette.info.main,
    },
    {
      title: 'PUT',
      value: '18',
      icon: <InputIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: 'DELETE',
      value: '12',
      icon: <DeleteOutlineIcon />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Requests By Type" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {requestTypes.map((requestType) => (
            <div className={classes.requestType} key={requestType.title}>
              <span className={classes.requestTypeIcon}>
                {requestType.icon}
              </span>
              <Typography variant="body1">{requestType.title}</Typography>
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
};

export default RequestsByType;
