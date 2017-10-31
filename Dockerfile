# node version
FROM node:8

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# bundle app source
COPY . .

# start runtime
EXPOSE 3000
CMD [ "npm", "start" ]
