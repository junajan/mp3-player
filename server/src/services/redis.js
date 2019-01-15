import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis);

export default class RedisClient {
	constructor (config) {
		this.client = redis.createClient(config.redis);
	}

	async get (key) {
		const val = await this.client.getAsync(key);
		return JSON.parse(val);
	}

	async set (key, val) {
		// stringify in order to handle issues with storing arrays
		return this.client.setAsync(key, JSON.stringify(val));
	}
}