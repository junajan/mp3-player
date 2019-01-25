FROM mhart/alpine-node:10

# Create app directory
WORKDIR /app

COPY . /app/

RUN apk update && apk add build-base libtool autoconf automake nasm
RUN npm install

ENV PORT=3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]
