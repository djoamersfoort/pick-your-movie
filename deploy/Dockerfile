FROM node:25-alpine
WORKDIR /app

# Install and build
COPY . .

RUN npm ci
RUN npm run prepare
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "build/index.js"]
