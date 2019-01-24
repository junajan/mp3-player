import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import { formatTimeDefault } from '../../utils/utils';

const EmptyLogItem = () => (
  <ListItem>
    <ListItemText>No logs</ListItemText>
  </ListItem>
);

const LogsItem = props => {
  const { createdAt, eventName, name } = props.item;
  return (
    <ListItem key={`log-${createdAt}`} divider>
      <ListItemText>
        {formatTimeDefault(createdAt)} | {eventName}: {name}
      </ListItemText>
    </ListItem>
  );
};

const WorldLog = props => {
  const { classes, logs } = props;
  return (
    <div className={classes.root}>
      <Typography variant="subheading" className={classes.logHeading}>
        Global log:
      </Typography>
      <List className={classes.list}>
        {logs && logs.length ? (
          logs.map(item => (
            <LogsItem key={`log-item-${item.createdAt}`} item={item} />
          ))
        ) : (
          <EmptyLogItem />
        )}
      </List>
    </div>
  );
};

LogsItem.propTypes = {
  item: PropTypes.object.isRequired,
};

WorldLog.propTypes = {
  classes: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
};

export default withStyles(styles)(WorldLog);
