FROM jrottenberg/ffmpeg:3.3-alpine
FROM mhart/alpine-node:10

COPY --from=0 / /

RUN apk --no-cache add python


# Create app directory
WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build

ENV PORT=4000
ENV FFMPEG_PATH='/usr/local/bin/ffmpeg'

EXPOSE 4000

CMD [ "npm", "start" ]

