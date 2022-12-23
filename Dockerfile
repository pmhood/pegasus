FROM node:18-alpine

WORKDIR /tmp/pegasus

COPY index.html *.json *.js *.ts ./
COPY src src/
COPY public public/

RUN npm install -q && npm run prod:build
RUN mkdir -p /app/pegasus && \
  cp -R dist/* /app/pegasus/ && \
  cp -R node_modules /app/pegasus/

RUN rm -Rf /tmp/pegasus

WORKDIR /app/pegasus

CMD ["node", "server/server.js"]
