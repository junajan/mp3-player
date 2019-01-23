import _ from 'lodash';
import SocketIo from 'socket.io';
import requireDir from 'require-dir';

function registerEventHandlers (modules, client) {
  modules.forEach(module => module.registerHandlers(client));
}

function initSocketModules (modules, app, io) {
  return modules.map(module => new module.default(app, io));
}

export default function SocketServer (server, app, logger) {
  logger.info('Starting socket.io server');

  const io = SocketIo(server);
  const socketModules = requireDir('./sockets');
  const modules = initSocketModules(Object.values(socketModules), app, io);

  /**
	 * On a new connection
	 *  - register logging middleware
	 *  - register events from all socket controllers
   */
  io.on('connection', (client) => {
    logger.debug('SocketIO::connect', client.id);

    /**
		 * Logging event handlers
     */
    client.use((packet, next) => {
      const _packet = _.cloneDeep(packet); // don't modify original packet
      const eventName = _packet.shift();
      logger.debug('SocketIO::%s', eventName, _packet);
      next();
    });

    client.on('disconnect', () => {
      logger.debug('SocketIO::disconnect', client.id);
    });

    client.on('error', (err) => {
      logger.error('SocketIO::error', err);
    });

    /**
		 * App event handlers
     */
    registerEventHandlers(modules, client);
  });

  return io;
}
