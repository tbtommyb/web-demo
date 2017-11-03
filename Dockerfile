FROM node:9

EXPOSE 8888

ADD . ./

CMD node app.js
