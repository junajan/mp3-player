import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grow from '@material-ui/core/Grow';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const ErrorBox = props => {
  const { classes, message, onClose } = props;
  return (
    <Grow in timeout={600}>
      <SnackbarContent
        className={classes.root}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.iconVariant} />
            <span className="error-message">{message}</span>
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Grow>
  );
};

ErrorBox.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ErrorBox);
