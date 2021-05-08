import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';
import {
  extractFullName,
  getProfileCompleteness,
  extractInitials,
  getBase64,
} from '../../../../utils/string';
import { DISPLAY_DATE_FORMAT } from '../../../../constants/schemas';
import FileUploadButton from '../../../../components/FileUploadButton';
import { uploadImage } from '../../../../services/lambda';
import toast from '../../../../utils/toast';
import { updateProfile } from '../../../../services/user';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  details: {
    display: 'flex',
  },
  cardAction: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 110,
    fontSize: theme.spacing(4),
    flexShrink: 0,
    flexGrow: 0,
  },
  typography: { marginTop: theme.spacing(0.5) },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountProfile = (props: any) => {
  const { className, user, onUpdate, canEdit, ...rest } = props;

  const classes: any = useStyles();

  const profleCompleteness = Math.floor(getProfileCompleteness(user));

  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleUploadPFP = async (image: any): Promise<void> => {
    setUploading(true);

    const base64Data = await getBase64(image);

    try {
      const { url: avatarUrl } = await uploadImage(
        base64Data,
        `${user.id}.png`,
        'pfp'
      );

      await updateProfile({ ...user, profile: { ...user.profile, avatarUrl } });
      toast.success('Image uploaded!');

      onUpdate();
    } catch (_) {
      toast.error('Failed to upload the image!');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePFP = async (): Promise<void> => {
    setRemoving(true);
    try {
      await updateProfile({
        ...user,
        profile: { ...user.profile, avatarUrl: null },
      });
      toast.success('PFP removed!');

      onUpdate();
    } catch (_) {
      toast.error('Failed to remove the image!');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {extractFullName(user) || user.username}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Roles: ' + user.activeRoles.map((role: any) => ` ${role}`)}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Joined: '}
              {moment(user.createdAt).format(DISPLAY_DATE_FORMAT)}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Time: '}
              {moment().format('hh:mm A')}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={user.profile.avatarUrl}>
            {extractInitials(user) || 'A'}
          </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">{`Profile Completeness: ${profleCompleteness}%`}</Typography>
          <LinearProgress
            value={profleCompleteness || 5}
            variant="determinate"
          />
        </div>
      </CardContent>
      {canEdit && (
        <>
          {' '}
          <Divider />
          <CardActions className={classes.cardAction}>
            <FileUploadButton
              onSelect={handleUploadPFP}
              className={classes.uploadButton}
              color="primary"
              variant="outlined"
              label={uploading ? 'Uploading.....' : 'Upload picture'}
              disabled={uploading || removing}
            />
            <Button
              variant="outlined"
              disabled={uploading || removing}
              onClick={handleRemovePFP}
            >
              {removing ? 'Removing......' : 'Remove picture'}
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  canEdit: PropTypes.bool,
  onUpdate: PropTypes.func,
  activeUser: PropTypes.object,
};

export default AccountProfile;
