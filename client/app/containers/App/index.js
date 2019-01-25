import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Header from '../../components/Header';
import PlayerPage from '../PlayerPage';
import NotFoundPage from '../NotFoundPage';

import styles from './styles';
const App = props => {
  const { classes } = props;
  return (
    <div>
      <Header />
      <div className={classnames('max-width', classes.content)}>
        <Switch>
          <Route key="player" exact path="/" component={PlayerPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
