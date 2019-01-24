# MP3 Player server
Server side app which serves mp3 files.
Application can also download songs from youtube, convert them to mp3 and then serve them through API as mp3 files.
After the file is downloaded and converted to mp3, it is saved in a local cache so the server does not have to download it again.

## REST API Routes
API provides following routes:
 - `/` - returns server name 
 - `/version` - returns version
 - `/ping` - health check endpoint for load balancer 
 - `/songs` - returns the list of all songs 
 - `/songs/:id/info` - returns info about selected song 
 - `/songs/:id/file` - returns mp3 file of a selected song 

## Socket server
Application creates also a socket server which emits two events:
 - `common::time` - event emitted every second with a current timestamp in Unix time format
 - `songs::download` - event emitted only when somebody downloads the audio file

## Running with docker
The easiest way how to run the server is to create a docker image and run it inside of a container, see following commands:
```
# build docker image:
docker build -t mp3-player-server/latest .

# run server
docker run -p=3000:3000 -e REDIS_HOST={redistAddress} -e REDIS_PASSWORD={redisPassword} -id -t mp3-player-server/latest

# display running container
docker ps

# read logs (and follow)
docker logs -f {containerId}

# stop running container
docker stop {containerId}
```

## Running without docker
### Config
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

Or set `ENV` variables:
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

### Install dependencies & build
```bash
npm install
npm run build
```

**NOTE:** When running without docker, one should have installed also ffmpeg for converting video files to mp3.

### Run the app
```bash
# start with prod env
npm start

# or install forever and run detached from terminal with watchdog
npm i -g forever
forever start -a --uid 'mp3-server' bin/server

# list running services
forever list

# stop mp3-server service
forever stop mp3-server
```  

## Dev commands
Some commands which can get handy during development:

```bash
npm run build-watch     # build and watch for file changes
npm run start-dev-watch # start with dev env and watch for file changes

npm test            # run tests unit & integration
npm test-watch      # run tests and watches for changes
npm run coverage    # calculate coverage
```

## TODOs
This app has many things which should be improved:   
 - add better test coverage
 - add integration tests (use docker-compose to spin up the test environment)
 - set up commit hooks (linting + plugins - eg. no-only-tests)
 - set up tools like mversion, commitizen, ..
 - types with typescript / flow?
 - improve internal logging
 - use a remote storage of cached audio files so we can horizontally scale without duplicating audio files 
 - split to lambda functions
 - set up properly CORS!
 - .. etc
 