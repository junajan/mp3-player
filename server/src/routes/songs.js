import express from 'express';
import songsControllerSingleton from '../controllers/songs';

class SongsRouter {
	constructor(app) {
		this.app = app;
		this.config = this.app.get('config');

		this.controller = songsControllerSingleton(app);
	}

	getRoutes() {
		const router = express.Router();

		router.get('/', this.controller.getAll.bind(this.controller));
		router.get('/:id/info', this.controller.getInfo.bind(this.controller));
		router.get('/:id/file', this.controller.getFile.bind(this.controller));

		return router;
	}
}

export default ['/songs', SongsRouter];