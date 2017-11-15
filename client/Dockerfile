# node version
FROM node:latest

# create app directory
RUN mkdir -p /usr/src/maalka_bedes/client/
WORKDIR /usr/src/maalka_bedes/client/

# install app dependencies
COPY package.json package-lock.json /usr/src/maalka_bedes/client/
RUN npm install

# bundle app source
COPY . /usr/src/maalka_bedes/client/

# build and optimize react
RUN npm run build

# start runtime
EXPOSE 3000
CMD [ "npm", "start" ]
