FROM node:14.16.0-alpine

ENV APP_DIR /app

WORKDIR ${APP_DIR}

COPY package*.json ./

RUN npm install -g nodemon rimraf typescript
RUN npm install

ENV PATH ${APP_DIR}/node_modules/.bin:$PATH

COPY . ${APP_DIR}

EXPOSE ${PORT}

CMD npm run dev:watch
