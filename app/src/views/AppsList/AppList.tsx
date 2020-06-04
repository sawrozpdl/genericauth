import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { APPS_URL } from '../../constants/endpoints';
import http from '../../utils/http';

import { AppsToolbar, AppCard } from './components';
import toast from '../../utils/toast';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await http.get(APPS_URL, { params: query });

      setPage(data);
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error('Network Error!');
      } else toast.error(response.data.message || 'Failed to load apps!');
    } finally {
      setLoading(false);
    }
  }, [query]);

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
  }, [query, fetchApps]);

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
      <Pagination
        handleNext={handleNextPageClick}
        handlePrevious={handlePreviousPageClick}
        page={query.page}
        disabled={loading || !page.content}
        totalPages={page.totalPages || 1}
        isFirst={page.first}
        isLast={page.last}
      />
    </div>
  );
};

export default AppList;
