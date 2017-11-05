FROM node:9

EXPOSE 8888

ADD . ./

CMD ["/usr/local/bin/node", "app.js"]
