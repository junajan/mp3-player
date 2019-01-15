import _ from 'lodash';
import express from 'express';
import logger from 'morgan';
import requireDir from 'require-dir';
import apiRoutes from './routes';

function connectServices(config) {
	const serviceModules = requireDir('./services');
	return _.mapValues(serviceModules, service => new service.default(config));
}

function connectRoutes (app, routes) {
	Object.entries(routes).map(([name, route]) => {
		const [prefix, router] = route;

		console.log('Deploying "%s" with route prefix "%s"', name, prefix);
		const routerModule = new router(app);
		app.use(prefix, routerModule.getRoutes());

		return routerModule;
	});
}

export default function AppServer (config) {
	const app = express();

	/**
   * API middlewares
   */
	app.use(logger('dev'));
	app.use(express.json());

	/**
   * API configs
   */
	app.set('port', config.port);
	app.set('config', config);

	/**
   * API services
   */
	app.set('services', connectServices(config));

	/**
   * API routes
   */
	connectRoutes(app, apiRoutes);

	return app;
}
