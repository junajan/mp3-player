import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SongItem from '../SongItem';
import styles from './styles';

const SongList = props => {
  const { classes, items, onItemClick } = props;
  return (
    <List className={classes.root}>
      {items.map(item => (
        <SongItem
          key={`item-${item}`}
          item={item}
          onClick={() => onItemClick(item)}
          className={classes.item}
          {...props}
        />
      ))}
      {items.length === 0 && (
        <ListItem>
          <ListItemText primary="No songs were loaded from API" />
        </ListItem>
      )}
    </List>
  );
};

SongList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SongList);
