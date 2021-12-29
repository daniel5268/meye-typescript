FROM node:16.13.1-alpine

RUN mkdir /meye
WORKDIR /meye
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN tsc
CMD ["node", "./dist/api/index.js"]
