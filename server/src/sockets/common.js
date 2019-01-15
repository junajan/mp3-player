
class CommonSocket {
	constructor(app, io) {
		this.app = app;
		this.io = io;

		setInterval(() => {
			this.io.emit('common::time', +new Date());
		}, 1000);
	}

	registerHandlers (client) {
		this._addClientEventHandlers(client);
		this._addServerEventHandlers(client);
	}

	_addClientEventHandlers(client) {
		client.on('ping', () => client.emit('pong'));
	}

	_addServerEventHandlers() {
		// no server events
	}
}

export default CommonSocket;