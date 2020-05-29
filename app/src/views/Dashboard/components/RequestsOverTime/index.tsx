import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
} from '@material-ui/core';
import GenericMoreButton from '../../../../components/GenericMoreButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chart from './Chart';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  yearSelect: {
    marginLeft: theme.spacing(1.25),
    position: 'relative',
    bottom: theme.spacing(0.625),
  },
  chart: {
    height: '100%',
  },
}));

const RequestsOverTime = (props: any) => {
  const { className, app, ...rest } = props;
  const classes = useStyles();

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const { events } = app;

  const yearlyEvents = events.reduce((acc: any, curr: any) => {
    const currYear = new Date(curr.createdAt).getFullYear();
    return {
      ...acc,
      [currYear]: acc[currYear] ? [...acc[currYear], curr] : [curr],
    };
  }, {});

  const yearLabels = Object.keys(yearlyEvents).map((name) => ({
    label: name,
    value: name,
  }));

  const initialData = labels.reduce((acc: any, curr: any) => {
    return { ...acc, [curr]: 0 };
  }, {});

  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const events = yearlyEvents[year];
    const filtered = events.reduce((acc: any, curr: any) => {
      const month = new Date(curr.createdAt).getMonth();
      const label = labels[month];
      return {
        ...acc,
        [label]: acc[label] ? acc[label] + 1 : 1,
      };
    }, initialData);
    setData(filtered);

    // eslint-disable-next-line
  }, [year]);

  const handleYearChange = (event: any) => {
    const { value: selectedYear } = event.target;
    setYear(selectedYear);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={<GenericMoreButton />}
        title={
          <>
            {'Requests Over Time during Year: '}
            <TextField
              id="standard-select-currency"
              select
              value={year}
              className={classes.yearSelect}
              onChange={handleYearChange}
            >
              {yearLabels.map((year) => (
                <MenuItem key={year.value} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </TextField>
          </>
        }
      />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
          <Box height={375} minWidth={500}>
            {data && (
              <Chart
                className={classes.chart}
                data={Object.values(data)}
                labels={Object.keys(data)}
              />
            )}
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

RequestsOverTime.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default RequestsOverTime;
