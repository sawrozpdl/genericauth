import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import UserContext from '../../context/UserContext';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import http from '../../utils/http';
import { USERS_URL } from '../../constants/endpoints';
import { interpolate } from '../../utils/string';
import Loading from '../../components/Loading';
import toast from '../../utils/toast';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();

  const user: any = useContext(UserContext);
  const { activeApp: appName } = user;
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({
    page: 0,
    size: 10,
    search: '',
  });
  const [page, setPage] = useState<any>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await http.get(interpolate(USERS_URL, { appName }), {
        params: query,
      });

      setPage(data);
    } catch (error) {
      toast.error('Failed to fetch users!');
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
    fetchUsers();
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar onSearch={handleSearch} />
      <div className={classes.content}>
        {loading ? (
          <Loading height={500} />
        ) : (
          <UsersTable users={page.content} />
        )}
      </div>
    </div>
  );
};

export default UserList;
