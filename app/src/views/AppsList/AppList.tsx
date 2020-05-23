import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { APPS_URL } from '../../constants/endpoints';
import http from '../../utils/http';

import { AppsToolbar, AppCard } from './components';
import toast from '../../utils/toast';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
  },
  results: { marginTop: theme.spacing(1) },
  searchLabel: { color: theme.palette.text.secondary },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const AppList = (props: any) => {
  const classes = useStyles();

  const [page, setPage] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ page: 0, size: 10, search: '' });

  const fetchApps = async () => {
    setLoading(true);
    try {
      const { data } = await http.get(APPS_URL, { params: query });

      setPage(data);
    } catch (error) {
      toast.error('Failed to load apps!');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string): boolean | void =>
    value !== query.search && setQuery({ ...query, search: value });

  const handleNextPageClick = () =>
    !page.last && setQuery({ ...query, page: query.page + 1 });

  const handlePreviousPageClick = () =>
    !page.first && setQuery({ ...query, page: query.page - 1 });

  useEffect(() => {
    try {
      fetchApps();
    } catch (exc) {
      toast.error('Failed to fetch apps!');
    }
  }, [query]);

  const { content: apps } = page;

  return (
    <div className={classes.root}>
      <AppsToolbar onSearch={handleSearch} {...props} />
      {loading ? (
        <Loading height={500} />
      ) : (
        <div className={classes.content}>
          {query.search && (
            <Typography variant="caption" className={classes.searchLabel}>{`
          Showing results for search query: ${query.search}`}</Typography>
          )}
          <Grid
            container
            spacing={3}
            className={query.search ? classes.results : undefined}
          >
            {apps &&
              apps.map((app: any) => (
                <Grid item key={app.id} lg={4} md={6} xs={12}>
                  <AppCard app={app} {...props} />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
      <div className={classes.pagination}>
        <Typography variant="caption">{`Page: ${query.page + 1} of ${
          page.totalPages
        }`}</Typography>
        <IconButton disabled={page.first} onClick={handlePreviousPageClick}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={page.last} onClick={handleNextPageClick}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AppList;
