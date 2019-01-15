FROM jrottenberg/ffmpeg:3.3-alpine
FROM mhart/alpine-node:10

COPY --from=0 / /

# Create app directory
WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build

ENV PORT=3000
ENV FFMPEG_PATH='/sbin/ffmpeg'

EXPOSE 3000
CMD [ "npm", "start" ]

