FROM node:18-alpine

WORKDIR /tmp/pegasus

RUN apk update && apk add tzdata && \
  cp /usr/share/zoneinfo/America/New_York /etc/localtime

COPY index.html *.json *.js *.ts ./
COPY src src/
COPY public public/

RUN npm install -q && npm run prod:build
RUN mkdir -p /app/pegasus && \
  cp -R dist/* /app/pegasus/ && \
  cp -R node_modules /app/pegasus/ && \
  cp package.json /app/pegasus/

RUN rm -Rf /tmp/pegasus

WORKDIR /app/pegasus

CMD ["node", "server/server.js"]
