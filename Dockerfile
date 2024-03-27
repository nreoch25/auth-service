FROM node:21-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./
COPY src ./src
RUN npm ci && npm run build

FROM node:21-alpine3.18

WORKDIR /app
# RUN apk add --no-cache curl
RUN npm install -g pm2
COPY --from=builder /app/build ./build

EXPOSE 4002

CMD [ "npm", "run", "start" ]