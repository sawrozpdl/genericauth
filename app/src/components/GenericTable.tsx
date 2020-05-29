import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const GenericTable = (props: any) => {
  const {
    className,
    data,
    columns,
    selection,
    selectedItems,
    setSelectedItems,
    ...rest
  } = props;

  const classes: any = useStyles();

  const handleSelectAll = (event: any) => {
    const { data } = props;

    let selectedItems;

    if (event.target.checked) {
      selectedItems = data.map((data: any) => data.id);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (event: any, id: any) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: any = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {selection && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          data.length && selectedItems.length === data.length
                        }
                        color="primary"
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length < data.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                  )}
                  {columns.map((elem: any) => {
                    return (
                      <TableCell key={elem.Header}>{elem.Header}</TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={row.id}
                    selected={selection && selectedItems.indexOf(row.id) !== -1}
                  >
                    {selection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.indexOf(row.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, row.id)}
                          value="true"
                        />
                      </TableCell>
                    )}
                    {columns.map((elem: any, index: any) => {
                      const { Cell } = elem;
                      return (
                        <TableCell key={`${row.id}-${index}`}>
                          <Cell
                            value={elem.accessor && row[elem.accessor]}
                            original={row}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>{props.children}</CardActions>
    </Card>
  );
};

GenericTable.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  selection: PropTypes.bool,
  data: PropTypes.array,
  columns: PropTypes.array,
  selectedItems: PropTypes.array,
  setSelectedItems: PropTypes.func,
};

export default GenericTable;
