FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production \
    && npm cache clean --force

COPY . .

FROM node:22-alpine

COPY --from=builder /app /app

EXPOSE 3000

CMD ["node", "index.js"]
