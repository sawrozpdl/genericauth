import React, { useState, useRef } from 'react';
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Popover,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import THEMES from '../../../../constants/themes';
import useSettings from '../../../../hooks/useSettings';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme: any) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
  },
  popover: {
    width: 320,
    padding: theme.spacing(2),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const { settings, saveSettings } = useSettings();
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field: any, value: any) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const handleSave = () => {
    saveSettings(values);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Badge
          color="secondary"
          variant="dot"
          classes={{ badge: classes.badge }}
        >
          <IconButton color="inherit" onClick={handleOpen} ref={ref}>
            <SvgIcon fontSize="small">
              <SettingsIcon />
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Typography variant="h4" color="textPrimary">
          Settings
        </Typography>
        <Box mt={2} px={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.direction === 'rtl'}
                edge="start"
                name="direction"
                onChange={(event) =>
                  handleChange(
                    'direction',
                    event.target.checked ? 'rtl' : 'ltr'
                  )
                }
              />
            }
            label="RTL"
          />
        </Box>
        <Box mt={2} px={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.responsiveFontSizes}
                edge="start"
                name="direction"
                onChange={(event) =>
                  handleChange('responsiveFontSizes', event.target.checked)
                }
              />
            }
            label="Responsive font sizes"
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            onChange={(event) => handleChange('theme', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme: string) => (
              <option key={theme} value={theme}>
                {theme.toLowerCase()}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Settings;
