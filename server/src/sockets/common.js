export default class CommonSocket {
  constructor(app, io) {
    this.app = app;
    this.io = io;

    this._registerBroadcasts();
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
    setInterval(() => {
      this.io.emit('common::time', +new Date());
    }, 1000);
  }

  /**
   * Events which happened on clients and should be processed on the server
   * @private
   */
  _addClientEventHandlers(client) {
    client.on('ping', () => client.emit('pong'));
  }

  /**
   * Events which happened on server and should propagate to clients
   * @private
   */
  _addServerEventHandlers() {}
}
