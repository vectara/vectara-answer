FROM --platform=linux/amd64 node:18

# Install AWS CLI
RUN apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install --upgrade awscli

WORKDIR /usr/src/app

# install npm packages
COPY docker/package.json ./
RUN npm install

# copy our code
COPY docker/server ./server
COPY public ./public
COPY img ./img
COPY src ./src
COPY build ./build
COPY ./start.sh ./

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["bash start.sh"]
