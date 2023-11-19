FROM --platform=linux/amd64 node:20.2-slim AS deps
COPY package.json ./
RUN npm install

FROM deps AS build
COPY ../public ./public
COPY ../img ./img
COPY ../src ./src
COPY ../tsconfig.json ./
COPY ../.eslintrc.js ./
RUN npm run build

FROM --platform=linux/amd64 node:20.2-slim AS runner
WORKDIR /usr/src/app
COPY --from=build build ./build
COPY docker/package.json docker/package-lock.json ./
RUN npm ci
COPY docker/server ./server
EXPOSE 3000
ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["node server/index.js"]