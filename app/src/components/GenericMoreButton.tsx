import React, { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles(() => ({
  menu: {
    width: 256,
    maxWidth: '100%',
  },
}));

const GenericMoreButton = (props: any) => {
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="More options">
        <IconButton {...props} onClick={handleMenuOpen} ref={moreRef}>
          <MoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          <ListItemText primary="Refresh" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Copy" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText primary="Export" />
        </MenuItem>
      </Menu>
    </>
  );
};

GenericMoreButton.propTypes = {
  className: PropTypes.string,
};

export default memo(GenericMoreButton);
