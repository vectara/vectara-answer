FROM --platform=linux/amd64 node:18

COPY docker/package.json ./
RUN npm install

WORKDIR /usr/src/app

# copy our code and create build folder in container
COPY public ./public
COPY img ./img
COPY build ./build

COPY docker/server ./server

EXPOSE 3000
# set up env variable, should turn on when you run docker
ENV USE_DOCKER=true

ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["node server/index.js"]

