import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import styles from './styles';

const SongIcon = isPaused => (isPaused ? <PauseIcon /> : <PlayIcon />);

const SongItem = props => {
  const { classes, item, activeItem, isPaused, onClick } = props;
  const activeId = activeItem ? activeItem.id : null;
  return (
    <ListItem onClick={onClick}>
      {activeId === item.id && ( // eslint-disable-line
        <ListItemIcon className={classes.icon}>
          {SongIcon(isPaused)}
        </ListItemIcon>
      )}
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

SongItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  activeItem: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SongItem);
