import event from 'eventemitter3';
import SongsModel from '../models/songs';

class SongsController extends event {
  constructor(app) {
    super();

    this.app = app;
    this.model = SongsModel(app, app.get('config'));

    // reregister events
    ['songs::youtubeConvert'].map(
      event => this.model.on(event, this.emit.bind(this, event))
    );
  }

  _enrichWithSongUrlHoc (req) {
    return (item) => ({
      ...item,
      sourceUrl: `${req.protocol}://${req.get('host')}/songs/${item.id}/file`
    });
  }

  async getAll (req, res) {
    const addSongUrl = this._enrichWithSongUrlHoc(req);
    let list = await this.model.getAll();

    list = list.map(addSongUrl);
    return res.json(list);
  }

  async getInfo (req, res, next) {
    const addSongUrl = this._enrichWithSongUrlHoc(req);
    const songId = parseInt(req.params.id, 10);
    let detail = await this.model.getInfo(songId);

    detail = addSongUrl(detail);

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
