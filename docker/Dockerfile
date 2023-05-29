FROM --platform=linux/amd64 node:18

# Install AWS CLI
RUN apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install --upgrade awscli

WORKDIR /usr/src/app

COPY docker/package.json .
RUN npm install

# Bundle app source
COPY build/ ./build
COPY server ./server
COPY start.sh .

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-l", "-c"]
#CMD ["tail -f /dev/null"]
CMD ["bash start.sh"]
