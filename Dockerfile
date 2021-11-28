FROM node:14.18.1-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 3000

CMD ["npm", "run", "app"]