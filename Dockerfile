# node version
FROM node:latest

# create app directory
RUN mkdir -p /usr/src/maalka_bedes/server/
WORKDIR /usr/src/maalka_bedes/server/

# install app dependencies
COPY package.json package-lock.json /usr/src/maalka_bedes/
RUN npm install

# bundle app source
COPY . /usr/src/maalka_bedes/

# start runtime
EXPOSE 5000
CMD [ "npm", "run", "server" ]
