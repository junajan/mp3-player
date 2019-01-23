import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis);

export default class RedisClient {
  constructor (config) {
    this.config = config;
    this.client = null;
  }

  _getClient () {
    if (!this.client)
      this.client = redis.createClient(this.config.redis);
    return this.client;
  }

  async get (key) {
    const val = await this._getClient().getAsync(key);
    return JSON.parse(val);
  }

  async set (key, val) {
    // stringify in order to handle issues with storing arrays
    return this._getClient().setAsync(key, JSON.stringify(val));
  }
}