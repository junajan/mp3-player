# MP3 Player server
Server side app which downloads songs from youtube, converts them to mp3 and serves them through API.

## Routes
API provides following routes:
 - `/` - returns server name 
 - `/version` - returns version
 - `/ping` - health check ep for loadbalancer 
 - `/songs` - returns the list of all songs 
 - `/songs/:id/info` - returns info about selected song 
 - `/songs/:id/file` - returns mp3 file of a selected song 

## Config
Add `dev.env.json` or `prod.env.json` to `./config` folder with following config object:
```js
{
  "port": 3000,
  "fillCacheAtStartup": true,         // whether to populate data during initialization
  "ffmpeg": "/usr/local/bin/ffmpeg",  // for converting youtube videos to mp3
  "redis": {
    "host": "",     // for connecting to songs list cache
    "password": ""  // redis auth
  }
}
```

Or set ENV variables:
 - `PORT` - port on which the app should run (default: `3000`)
 - `LOG_LEVEL` - log level for output logs (values: `trace, debug, info, warn, error, fatal` | default: `info`)
 - `FFMPEG_PATH` - path to ffmpeg binary
 - `FILL_AT_STARTUP` - fill redis cache at startup
 - `REDIS_HOST` - redis instance host
 - `REDIS_PASSWORD` - redis instance password

Variables can be set also when running node server:
```bash
LOG_LEVEL=trace npm start
```

## Installing dependencies & build
```bash
npm install
npm run build
```

When running without docker, one should have installed also ffmpeg for converting video files to mp3.
 

## Running app
```bash
npm start # start with prod env
```  

## Dev
Some commands which can get handy when running the app:

```bash
npm run build-watch     # build and watch for file changes
npm run start-dev-watch # start with dev env and watch for file changes

npm test            # run tests unit & integration
npm run coverage    # calculate coverage

```  

## TODOs
 - improve internal logging
 - dockerize whole app
 - add better test coverage
 - give some love to eslint errors
 - set up commit hooks (linting + plugins - eg. no-only-tests)
 - set up tools like mversion, commitizen, ..
 - types with typescript / flow?
