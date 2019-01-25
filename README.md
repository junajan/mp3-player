# Online MP3 Player
Website app for playing Mp3 files stored directly on the server or on Youtube.
Please see also [client](client/README.md) and [server](server/README.md) Readme for more details.

## Configuration
Two environment variables have to be provided in order to run the server: 
 - `REDIS_HOST` - Host address of Redis store
 - `REDIS_PASSWORD` - Redis store password

Both variables are being used when fetching the list of songs from the remote Redis instance.

## Running with docker-compose
Following commands will run both services (client and server):
```bash
# run 
REDIS_HOST={redistAddress} -e REDIS_PASSWORD={redisPassword} docker-compose up -d

# list running services
docker-compose ps

# show logs with follow mode (-f)
docker-compose logs -f

# stop services
docker-compose stop
```

And propagate them on addresses:
 - `http://localhost:3000` - client service 
 - `http://localhost:4000` - backend service 

## TODOs
Except things listed already in the client and server folders, this project would appreciate if we:
 - split client and server to two separated repos
 - unify styles and commands
  