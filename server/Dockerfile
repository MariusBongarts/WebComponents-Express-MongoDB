# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

# add app
COPY . /app

RUN npm install

RUN npm i -g nodemon

EXPOSE 3443

# start app
CMD npm run start:dev