# MP3 Player client
Mp3 web player written in React together with [Material-UI](https://material-ui.com/).
When starting, the player downloads a list of all songs from the [backend service](../server/) and play them using `react-audio-player` plugin.
It also streams server events (`song download` and `youtube video to mp3 file conversion`).

NOTE: This app was created from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

## Configuration
There are two environment variables (see [defaults](./.env.base)):
 - `NODE_ENV` - environment type (default: `production`)
 - `API_URL` - API URL of backend service (default: `http://localhost:4000`)

Environment variables can be set when running the server like this:
```bash
API_URL=http://service.url npm start
```

## Running with docker-compose
The easiest way how to run this application is using `docker-compose`:
```bash
# run in production 
docker-compose up -d
```

## Running without docker
### Install dependencies
```bash
npm install
```

### Start with webpack
```bash
# with DEV env
npm start

# or PROD env
npm run start:prod
```

Or create a production build:
```bash
npm run build
```

## Dev commands
Some commands which can get handy during development:
```bash
npm run lint            # check code style with eslint
npm run lint -- --fix   # check code style and fix when possible
npm run # start with dev env and watch for file changes

npm test            # run tests unit & integration
npm run test:watch      # run tests and watches for changes
```

## TODOs
This app has many things which should be improved:   
 - add better test coverage
 - set up git hooks (linting + plugins - eg. no-only-tests)
 - set up tools like mversion, commitizen, ..
 - add types with typescript / flow
 - improve internal logging
 - improve build size
 - Better separation of deps and devDeps
 - add E2E tests with cypress
 - .. etc
 