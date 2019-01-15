import path from 'path';
import YoutubeDownloader from '../services/youtubeDownloader';
import mockSongs from '../../resources/songs.json';

export class SongsModel{
	constructor(app, config) {
		this.songDir = 'resources/songs/';
		this.youtubeDownloader = new YoutubeDownloader(config);
    this.redisClient = this._getRedisClient(app)

    if(config.fillCacheAtStartup)
			this.redisClient.set('songs', mockSongs);

    // TODO rethink this approach
    this.downloadedSongsCache = {}
	}

	_getCachedYoutubeSong (code) {
    return this.downloadedSongsCache[code]
	}

	_setCachedYoutubeSong (code, path) {
    return this.downloadedSongsCache[code] = path
	}

	_getRedisClient (app) {
    return app.get('services').redis;
	}

	_getSongFilePath (song) {
		return song.fullPath || path.join(__dirname, '../../', this.songDir, song.path);
	}

	async getAll () {
		return await this.redisClient.get('songs');
	}

	async getInfo (id) {
		const list = await this.getAll();
		return list.find(song => song.id === id);
	}

	async getSongFileInfo (id) {
		const list = await this.getAll();

		const detail = list.find(song => song.id === id);

		// download only when not cached
		if (detail.youtube) {
			let fullPath = this._getCachedYoutubeSong(detail.youtube)

			if (!fullPath) {
				console.log('Downloading song from youtube:', detail.youtube);
				fullPath = await this.youtubeDownloader.download(detail.youtube);
        // cache downloaded file so we don't have to download it again
				this._setCachedYoutubeSong(detail.youtube, fullPath)
			}

			detail.fullPath = fullPath
		}

		return detail
			? {
				name: `${detail.name}.mp3`,
				file: this._getSongFilePath(detail)
			}
			: null;
	}
}

let x = null;
export default (...args) => {
	if(!x) x = new SongsModel(...args);
	return x;
};
