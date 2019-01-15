import event from 'eventemitter3';
import SongsModel from '../models/songs';

class SongsController extends event {
	constructor(app) {
		super();

		this.app = app;
		this.model = SongsModel(app, app.get('config'));
	}

	async getAll (req, res) {
		let list = await this.model.getAll();
		// map only info necessary info
		list = list.map(({id, name, meta }) => ({ id, name, meta }));
		return res.json(list);
	}

	async getInfo (req, res, next) {
		const songId = parseInt(req.params.id, 10);
		const detail = await this.model.getInfo(songId);

		return detail
			? res.json(detail)
			: next();
	}

	async getFile (req, res, next) {
		const songId = parseInt(req.params.id, 10);
		const info = await this.model.getSongFileInfo(songId);

		this.emit('songs::download', { id: songId, ...info });
		return info
			? res.download(info.file, info.name)
			: next();
	}
}

let x = null;
export default (...args) => {
	if (!x) x = new SongsController(...args);
	return x;
};
