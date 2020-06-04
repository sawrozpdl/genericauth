import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Modal } from '../../../../components';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Chip,
  Avatar,
  TextField,
  Typography,
} from '@material-ui/core';
import { promoteUser } from '../../../../services/user';
import { handleError } from '../../../../utils/error';
import toast from '../../../../utils/toast';
import roles from '../../../../constants/roles';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  cardAction: {
    padding: theme.spacing(2),
  },
}));

const RoleDetails = (props: any) => {
  const { className, user, isAdmin, onUpdate, ...rest } = props;

  const { activeRoles, username, activeApp: appName } = user;

  const [showAddRole, setShowAddRole] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const classes = useStyles();

  const handleDemote = async (role: string): Promise<void> => {
    if (Object.keys(roles).includes(role)) {
      return toast.info('Cannot delete basic roles');
    }
    try {
      setSubmitting(true);
      await promoteUser(appName, username, role, true);
      onUpdate();
      toast.success('Role removed successfully!');
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePromote = async (role: string): Promise<void> => {
    if (role.length < 3)
      return toast.info('Role name should be at least 3 characters');
    try {
      setSubmitting(true);
      await promoteUser(
        appName,
        username,
        role.toUpperCase().replace(/ {2}/g, ' ').replace(/ /g, '_')
      );
      onUpdate();
      setRoleName('');
      toast.success('Role added successfully!');
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="Information about active roles of user in app"
          title="Roles"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {activeRoles.map((role: any) => (
              <Grid item md={6} xs={12} key={role}>
                {' '}
                <Chip
                  avatar={<Avatar>{role.charAt(0).toUpperCase()}</Avatar>}
                  label={role}
                  disabled={submitting || !isAdmin}
                  onDelete={() => {
                    handleDemote(role);
                  }}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        {isAdmin && (
          <>
            {' '}
            <Divider />
            <CardActions className={classes.cardAction}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  setShowAddRole(true);
                }}
              >
                Add Role
              </Button>
            </CardActions>
          </>
        )}
      </form>
      <Modal
        header={
          <Typography variant="h4" color="textPrimary">
            {`Add a new role for ${user.username}`}
            {'   '}
          </Typography>
        }
        footer={
          <Button
            autoFocus
            disabled={submitting}
            onClick={() => handlePromote(roleName)}
            color="primary"
          >
            Add Role
          </Button>
        }
        handleClose={() => setShowAddRole(false)}
        open={showAddRole}
      >
        <TextField
          fullWidth
          label="Role Name"
          margin="dense"
          name="role"
          onChange={(e) => {
            setRoleName(e.target.value);
          }}
          type="text"
          value={roleName}
          variant="outlined"
        />
      </Modal>
    </Card>
  );
};

RoleDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  isAdmin: PropTypes.bool,
  onUpdate: PropTypes.func,
  activeUser: PropTypes.object,
};

export default RoleDetails;
