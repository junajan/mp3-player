import _ from 'lodash';
import express from 'express';
import requireDir from 'require-dir';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes';

function connectServices(config, logger) {
  // require all services from services dir
  const serviceModules = requireDir('./services');

  // create service objects
  return _.mapValues(serviceModules, (service, name) => {
    logger.trace('Building service "%s"', name);
    return new service.default(config, logger);
  });
}

function connectRoutes (api, routes, logger) {
  Object.entries(routes).map(([name, route]) => {
    const [prefix, router] = route;

    logger.trace('Deploying "%s" with route prefix "%s"', name, prefix);
    const routerModule = new router(api);
    api.use(prefix, routerModule.getRoutes());

    return routerModule;
  });
}

export default function ApiFactory (config, logger) {
  const api = express();

  // Register API middlewares
  api.use(helmet())
  api.use(cors())
  api.use(logger.expressMiddleware);
  api.use(express.json());

  // Register common properties
  api.set('port', config.port);
  api.set('config', config);

  // Register services
  api.set('services', connectServices(config, logger));
  // Register API routes
  connectRoutes(api, apiRoutes, logger);

  api.use((req, res) => {
    res.status(404).json({
      error: 'Requested page was not found'
    });
  });

  return api;
}
