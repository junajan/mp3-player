import songsControllerSingleton from '../controllers/songs';

export default class SongsSocket {
  constructor(app, io) {
    this.app = app;
    this.io = io;
    this.songsController = songsControllerSingleton(app);

    this._registerBroadcasts(io);
  }

  registerHandlers (client) {
    this._addClientEventHandlers(client);
    this._addServerEventHandlers(client);
  }

  /**
	 * Broadcast events emitted from server
   * @private
   */
  _registerBroadcasts () {
    this.songsController.on('songs::download', ({ id, name }) => {
      this.io.emit('songs::download', { id, name });
    });
  }

  /**
	 * Events which happened on clients and should be processed on the server
   * @private
   */
  _addClientEventHandlers() {}

  /**
	 * Events which happened on server and should propagate to clients
   * @private
   */
  _addServerEventHandlers () {}
}
