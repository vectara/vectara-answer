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
COPY --from=deps node_modules ./node_modules
COPY server ./server
EXPOSE 4444
ENTRYPOINT ["/bin/bash", "-l", "-c"]
CMD ["node server/index.js"]