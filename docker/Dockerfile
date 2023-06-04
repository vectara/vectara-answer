FROM --platform=linux/amd64 node:18

# Install AWS CLI
RUN apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install --upgrade awscli

WORKDIR /usr/src/app

# copy our code and create build folder in container
COPY public ./public
COPY img ./img
COPY src ./src
COPY tsconfig.json ./
COPY docker/package.json ./

RUN npm install
RUN npm run build

COPY docker/server ./server
COPY docker/start.sh ./

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["bash start.sh"]
