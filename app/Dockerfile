FROM node:10-alpine

# Install yarn and other dependencies via apk
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

COPY . /srv/
WORKDIR /srv

RUN /usr/local/bin/npm install

CMD /usr/local/bin/node app.js