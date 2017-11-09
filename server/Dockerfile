FROM node:9

RUN apt-get update && apt-get install -y sudo

ADD . /server

WORKDIR /server

RUN npm install -g nodemon

CMD ["sudo", "nodemon", "server.js"]
