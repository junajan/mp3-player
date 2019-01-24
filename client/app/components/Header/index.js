import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const AppHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className="max-width">
          <Link className={classes.link} to="/">
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
            >
              <Icon className={classes.icon}>play_circle_filled</Icon>
              Audio Player
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
