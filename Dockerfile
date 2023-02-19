FROM node:16

WORKDIR /usr/src/app

# This environment variable is NOT sensitive
# and is used only during build time. Intended for GitHub Actions CI.
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL ${REACT_APP_SERVER_URL}

COPY package.json ./
COPY tsconfig.json ./
COPY package-lock.json ./

RUN npm install ci
RUN npm install -g serve

COPY . ./

RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "build" ]