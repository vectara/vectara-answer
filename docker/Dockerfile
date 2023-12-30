FROM --platform=linux/amd64 node:21.2-slim AS deps
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --maxsockets 5

FROM --platform=linux/amd64 deps AS builder
COPY ../public ./public
COPY ../img ./img
COPY ../src ./src
COPY ../tsconfig.json ./
COPY ../.eslintrc.js ./
RUN npm run build
RUN rm -r node_modules
COPY docker/package.json docker/package-lock.json ./
RUN npm ci --maxsockets 5

FROM --platform=linux/amd64 node:21.2-slim AS runner
WORKDIR /usr/src/app
COPY --from=builder build ./build
COPY --from=builder node_modules ./node_modules
COPY server ./server
EXPOSE 3000
ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["PORT=3000 node server/index.js"]
