# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

# add app
COPY . /app

RUN npm install

EXPOSE 8080

# start app
CMD npm start