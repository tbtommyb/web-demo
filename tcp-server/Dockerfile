FROM node:9

ADD . /tcp-server

WORKDIR /tcp-server

RUN npm install -g nodemon

CMD ["nodemon", "app.js"]
