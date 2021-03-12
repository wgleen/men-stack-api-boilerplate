FROM node:14.16.0-alpine

ENV APP_DIR /app

WORKDIR ${APP_DIR}

COPY . ${APP_DIR}

RUN npm install --quiet

EXPOSE ${PORT}

CMD npm run dev:watch
