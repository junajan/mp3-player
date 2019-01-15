import path from 'path';
import fs from 'fs';
import tmp from 'tmp';
import youtubedl from 'youtube-dl';
import converter from 'video-converter';

tmp.setGracefulCleanup();

export default class YoutubeDownloader {
	constructor (config) {
		this.youtubeUrlPrefix = 'https://www.youtube.com/watch?v=';
		this.tmpDir = tmp.dirSync({  prefix: 'songs_' });

		converter.setFfmpegPath(config.ffmpeg, err => {
			if (err) throw new Error(err);
		});
	}

	_getYoutubeUrl (code) {
		return `${this.youtubeUrlPrefix}${code}`;
	}

	_convertMp4ToMp3 (from, to) {
		return new Promise((resolve, reject) => {
			converter.convert(from, to, err =>
				err
					? reject(err)
					: resolve(to)
			);
		});
	}
	_downloadFile (url, path) {
		return new Promise((resolve, reject) => {
			const video = youtubedl(url, [], { cwd: this.tmpDir.name });
			video.pipe(fs.createWriteStream(path));
			video.on('end', () => resolve(path));
			video.on('error', reject);
		});
	}
	async download(code) {
		const youtubeUrl = this._getYoutubeUrl(code);
		const filePathMp4 = path.join(this.tmpDir.name, `${code}.mp4`);
		const filePathMp3 = path.join(this.tmpDir.name, `${code}.mp3`);

		await this._downloadFile(youtubeUrl, filePathMp4);
		return this._convertMp4ToMp3(filePathMp4, filePathMp3);
	}
}