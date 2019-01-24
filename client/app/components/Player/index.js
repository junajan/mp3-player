import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactAudioPlayer from 'react-audio-player';

import styles from './styles';

const Player = props => {
  const { item, classes } = props;
  return (
    <div>
      <Typography variant="h3" component="h2" className={classes.title}>
        Player
      </Typography>
      <ReactAudioPlayer
        src={item && item.sourceUrl}
        autoPlay
        controls
        {...props}
      />
    </div>
  );
};

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(Player);
