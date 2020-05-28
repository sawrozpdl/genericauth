import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import UserContext from '../../context/UserContext';
import validate from 'validate.js';
import { UsersToolbar, UsersTable } from './components';
import http from '../../utils/http';
import { USERS_URL } from '../../constants/endpoints';
import { interpolate } from '../../utils/string';
import Loading from '../../components/Loading';
import toast from '../../utils/toast';
import Pagination from '../../components/Pagination';
import { Modal } from '../../components/Modal';
import UserDetails from '../CreateApp/UserDetails';
import { handleError } from '../../utils/error';
import roles from '../../constants/roles';
import { disableUser } from '../../services/user';
import { collectObject } from '../../utils/object';

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

const userSchema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
      pattern: /^[a-z0-9_-]{3,16}$/,
      message: 'Username is not valid',
    },
    length: {
      minimum: 3,
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
      maximum: 128,
    },
  },
  rPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
      maximum: 128,
    },
  },
};

const History = () => {
  const classes = useStyles();

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;
  const { activeApp: appName } = user;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState({
    page: 0,
    size: 10,
    search: '',
    active: true,
  });
  const [page, setPage] = useState<any>([]);
  const [showAddUser, setShowAddUser] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const isAdmin = user.activeRoles.includes(roles.ADMIN);

  const fetchUsers = useCallback(async () => {
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
  }, [query, appName]);

  const [formState, setFormState] = useState<any>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    if (!isAdmin) return;
    const errors = validate(formState.values, userSchema);
    setFormState((formState: any) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, isAdmin]);

  const hasError = (field: any) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleChange = (event: any) => {
    if (event.persist) event.persist();
    setFormState((formState: any) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSearch = (value: string): boolean | void =>
    value !== query.search && setQuery({ ...query, search: value });

  const handleNextPageClick = () =>
    !page.last && setQuery({ ...query, page: query.page + 1 });

  const handlePreviousPageClick = () =>
    !page.first && setQuery({ ...query, page: query.page - 1 });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserAdd = async () => {
    setSubmitting(true);
    const { email, username, password, rPassword } = formState.values;
    if (password !== rPassword) {
      setSubmitting(true);
      return toast.info("Passwords don't match, Please try again");
    }
    try {
      await http.post(interpolate(USERS_URL, { appName }), {
        body: {
          email,
          username,
          password,
        },
      });
      toast.success('User successfuly Created!');
      setFormState(() => ({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
      }));
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRefreshClick = () => {
    fetchUsers();
  };

  const handleBulkDisable = async (actionName: string, hard = false) => {
    if (selectedUsers.includes(user.id)) {
      return toast.info(`${actionName} of self is not allowed!`);
    }
    const toDisable = collectObject(page.content, selectedUsers, 'id');
    try {
      for (let i = 0; i < toDisable.length; i++) {
        await disableUser(toDisable[i], hard);
      }
      toast.success(`${actionName} successfull!`);
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeactivateClick = async () => {
    await handleBulkDisable(query.active ? 'Deactivation' : 'Activation');
  };

  const handleDeleteClick = async () => {
    await handleBulkDisable('Deletion', true);
  };

  return (
    <div className={classes.root}>
      <UsersToolbar
        onSearch={handleSearch}
        isAdmin={isAdmin}
        active={query.active}
        selectedUsers={selectedUsers}
        setActive={(event, value): void =>
          setQuery({ ...query, active: value })
        }
        onRefresh={handleRefreshClick}
        onDeactivateClick={handleDeactivateClick}
        onDeleteClick={handleDeleteClick}
        onAddUserClick={(): void => setShowAddUser(true)}
      />
      <div className={classes.content}>
        {loading ? (
          <Loading height={500} />
        ) : (
          <UsersTable
            users={page.content}
            appName={appName}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
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
          </UsersTable>
        )}
      </div>
      <Modal
        header={
          <Typography variant="h4" color="textPrimary">
            {`Add a new user to ${appName}`}
          </Typography>
        }
        footer={
          <Button
            autoFocus
            disabled={submitting || !formState.isValid}
            onClick={() => handleUserAdd()}
            color="primary"
          >
            Add User
          </Button>
        }
        handleClose={() => setShowAddUser(false)}
        open={showAddUser}
      >
        <UserDetails
          noCaptions={true}
          hasError={hasError}
          handleChange={handleChange}
          formState={formState}
          isSubmitting={submitting}
          allowEmail={true}
        />
      </Modal>
    </div>
  );
};

export default History;
