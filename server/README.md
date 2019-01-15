# mp3-player-server
Server side app which downloads songs from youtube, converts them to mp3 and serves them through API routes:

## Routes
API has following routes:
 - `/` - returns server name 
 - `/version` - returns version
 - `/ping` - health check ep for loadbalancer 
 - `/songs` - returns the list of all songs 
 - `/songs/:id/info` - returns info about selected song 
 - `/songs/:id/file` - returns mp3 file of a selected song 

## Config
Add `dev.env.json` or `prod.env.json` to `./config` folder:
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

## Dependencies & build
```bash
npm install
npm run build
```

## Startup
```bash
npm start # start with prod env

npm run start-dev-watch # start with dev env and watch for file changes
```  

## Dev
```bash
npm run build-watch # build and watch for file changes
npm test            # run tests unit & integration
npm run coverage    # calculate coverage
```  

## TODOs
 - load config from env
 - improve internal logging
 - dockerize whole app
 - add better test coverage
 - give some love to eslint errors
 - set up commit hooks (linting + plugins - eg. no-only-tests)
 - set up tools like mversion, commitizen, ..
 - types with typescript / flow?
 - cleanup
