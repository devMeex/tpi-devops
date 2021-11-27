FROM node:14.18.1-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

CMD ["npm", "run", "app"]