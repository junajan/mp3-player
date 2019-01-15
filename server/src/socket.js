import _ from 'lodash';
import SocketIo from 'socket.io';
import requireDir from 'require-dir';

function registerEventHandlers (modules, client) {
	modules.forEach(module => module.registerHandlers(client));
}

function initSocketModules (modules, app, io) {
	return modules.map(module => new module.default(app, io));
}

export default function SocketServer (server, app) {
	console.log('Starting socket.io server');
	const io = SocketIo(server);
	const socketModules = requireDir('./sockets');
	const modules = initSocketModules(Object.values(socketModules), app, io);

	/**
   * SocketIo routes
   */
	io.on('connection', (client) => {
		console.log('SocketIO::connect', client.id);

		client.use((packet, next) => {
			const _packet = _.cloneDeep(packet); // don't modify original packet
			const eventName = _packet.shift();
			console.log('SocketIO::%s', eventName, _packet);
			next();
		});

		registerEventHandlers(modules, client);

		client.on('disconnect', () => {
			console.log('SocketIO::disconnect', client.id);
		});
	});

	return io;
}
