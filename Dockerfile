# node version
FROM node:latest

# create app directory
RUN mkdir -p /usr/src/maalka_bedes

WORKDIR /usr/src/maalka_bedes

# install app dependencies
COPY package.json /usr/src/maalka_bedes/
RUN npm install

# bundle app source
COPY . /usr/src/maalka_bedes

# start runtime
EXPOSE 3000
CMD [ "npm", "start" ]
