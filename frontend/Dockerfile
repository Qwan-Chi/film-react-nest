FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}
RUN npm run build

FROM busybox:1.36 AS production
COPY --from=build /app/dist /dist
VOLUME ["/frontend"]
CMD ["sh", "-c", "rm -rf /frontend/* && cp -R /dist/. /frontend/ && touch /frontend/.ready && tail -f /dev/null"]
