FROM --platform=linux/amd64 node:20.2-slim

COPY docker/package.json ./
RUN npm install

WORKDIR /usr/src/app

# copy our code and create build folder in container
COPY public ./public
COPY img ./img
COPY build ./build

COPY docker/server ./server

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["node server/index.js"]

