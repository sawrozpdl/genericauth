import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import UserContext from '../../context/UserContext';
import { HistoryToolbar } from './components';
import Loading from '../../components/Loading';
import toast from '../../utils/toast';
import Pagination from '../../components/Pagination';
import roles from '../../constants/roles';
import GenericTable from '../../components/GenericTable';
import getColumns from './columns';
import { fetchApp, fetchUsersInApp } from '../../services/app';

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

const History = () => {
  const classes = useStyles();

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;
  const { activeApp: appName } = user;
  const [loading, setLoading] = useState(true);

  const isAdmin = user.activeRoles.includes(roles.ADMIN);

  const [selectedUser, setSelectedUser] = useState(
    isAdmin ? 'ALL' : `users/${user.id}`
  );
  const [events, setEvents] = useState([]);
  const [app, setApp] = useState<any>();

  const filterEvents = (events: any) =>
    events
      .filter((event: any) => event.producer && event.consumer)
      .sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
      );

  const fetchUsersAndApp = useCallback(async () => {
    setLoading(true);
    try {
      const app = await fetchApp(appName, { detail: true });
      const activeUserPage = await fetchUsersInApp(appName, { size: 1000 });
      const inActiveUserPage = await fetchUsersInApp(appName, {
        size: 1000,
        active: false,
      });
      app.users = [...activeUserPage.content, ...inActiveUserPage.content];
      app.events = filterEvents(app.events);
      setEvents(app.events);
      setApp(app);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [appName]);

  const [query, setQuery] = useState({ page: 0, size: 10, search: '' });
  const [page] = useState({ totalPages: 1, last: true, first: true });

  // const handleSearch = (value: string): boolean | void =>
  //   value !== query.search && setQuery({ ...query, search: value });

  const handleNextPageClick = () =>
    !page.last && setQuery({ ...query, page: query.page + 1 });

  const handlePreviousPageClick = () =>
    !page.first && setQuery({ ...query, page: query.page - 1 });

  useEffect(() => {
    fetchUsersAndApp();
  }, [fetchUsersAndApp]);

  useEffect(() => {
    if (loading) return;
    const { events } = app;
    if (!selectedUser || selectedUser === 'ALL') return setEvents(events);
    const filterEvents = events.filter(
      (event: any) =>
        event.producer === selectedUser || event.consumer === selectedUser
    );
    setEvents(filterEvents);
  }, [selectedUser, app, loading]);

  const handleRefreshClick = () => {
    fetchUsersAndApp();
  };

  const handleUserChange = (event: any) => {
    const { value } = event.target;
    setSelectedUser(value);
  };

  const handleExportClick = () => {
    console.log('TODO');
  };

  return (
    <div className={classes.root}>
      <HistoryToolbar
        users={app && app.users}
        selectedUser={selectedUser}
        onUserChange={handleUserChange}
        isAdmin={isAdmin}
        onRefresh={handleRefreshClick}
        onExport={handleExportClick}
      />
      <div className={classes.content}>
        {loading ? (
          <Loading height={500} />
        ) : (
          <GenericTable
            data={events}
            columns={getColumns(appName, app.users)}
            selection={false}
          >
            <Pagination
              handleNext={handleNextPageClick}
              handlePrevious={handlePreviousPageClick}
              page={query.page}
              disabled={loading}
              totalPages={page.totalPages}
              isFirst={page.first}
              isLast={page.last}
            />
          </GenericTable>
        )}
      </div>
    </div>
  );
};

export default History;
