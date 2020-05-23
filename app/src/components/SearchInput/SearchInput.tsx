import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme: any) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  search: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const SearchInput = (props: any) => {
  const { className, onChange, onSearch, style, placeholder, ...rest } = props;

  const classes = useStyles();

  const [value, setValue] = useState('');

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        placeholder={placeholder}
        disableUnderline
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ArrowForwardIcon
        className={classes.search}
        onClick={() => onSearch(value)}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  style: PropTypes.object,
  placeholder: PropTypes.string,
};

export default SearchInput;
