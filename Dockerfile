FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY package-lock.json ./

RUN npm install ci
RUN npm install -g serve

COPY . ./

RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "build" ]