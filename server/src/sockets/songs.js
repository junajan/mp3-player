import songsControllerSingleton from '../controllers/songs';

class SongsSocket {
	constructor(app, io) {
		this.app = app;
		this.io = io;
		this.songsController = songsControllerSingleton(app);

		this.songsController.on('songs::download', ({ id, name }) => {
			io.emit('songs::download', { id, name });
		});
	}

	registerHandlers (client) {
		this._addClientEventHandlers(client);
		this._addServerEventHandlers(client);
	}

	_addClientEventHandlers() {
	}

	_addServerEventHandlers() {
	}
}

export default SongsSocket;