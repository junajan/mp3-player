import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import {
  fetchSongs,
  closeErrorMessage,
  playSong,
} from '../../actions/playerActions';
import withSocket from '../../utils/socket';

import Error from '../../components/Error';
import SongList from '../../components/SongList';
import GlobalLog from '../../components/GlobalLog';
import Player from '../../components/Player';
import styles from './styles';

const PlayerPage = props => {
  const { classes, dispatch, socket } = props;
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const { loading, error, items, activeItem } = props.player;

  /**
   * Event handlers
   */
  const onCloseErrorClick = () => {
    dispatch(closeErrorMessage());
  };

  const onPlayClick = item => {
    dispatch(playSong(item));
  };

  const onNewLogEntry = eventName => item => {
    const newItem = {
      ...item,
      eventName,
    };

    // for some reason this works only when mutating previous object
    // setLogs([newItem, ...logs])
    logs.unshift(newItem);
    setLogs(logs);
  };

  const onSongDownloadEvent = onNewLogEntry('Downloading song');
  const onYoutubeConvertEvent = onNewLogEntry('Converting youtube video');

  useEffect(() => {
    dispatch(fetchSongs());
    socket.on('songs::download', onSongDownloadEvent);
    socket.on('songs::youtubeConvert', onYoutubeConvertEvent);

    // cleanup
    return () => {
      socket.off('songs::download', onSongDownloadEvent);
      socket.off('songs::youtubeConvert', onYoutubeConvertEvent);
    };
  }, []);

  /**
   * Return elements
   */
  if (loading)
    return (
      <Grid container justify="center">
        <ReactLoading type="bars" color="black" />
      </Grid>
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {error && (
          <Grid item xs={12}>
            <Error message={error} onClose={onCloseErrorClick} />
          </Grid>
        )}
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Player
              item={activeItem}
              onPause={() => setIsPaused(true)}
              onPlay={() => setIsPaused(false)}
            />
          </Paper>
          <Paper className={classnames(classes.worldLog, classes.paper)}>
            <GlobalLog logs={logs} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <SongList
              onItemClick={onPlayClick}
              items={items}
              activeItem={activeItem}
              isPaused={isPaused}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

PlayerPage.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => ({
    player: state.player,
  })),
  withSocket,
)(PlayerPage);
