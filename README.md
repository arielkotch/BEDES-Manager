# BEDES-Manager

A project to ease the management of terms in the Building Energy Data Exchange Standard dictionary.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need to install:

 * Node.js
 * MongoDB

### Installing

```bash
npm run devbuild
npm start
```
Go to http://127.0.0.1:5000/api/initial-import to do initial xml import into DB.

## Running the tests

## Usage with Docker
Docker is used to create containers, or a packaged application with all its parts, which helps eliminate the issues teams face with different development environments.

Read more at https://www.docker.com/what-docker.

For general purposes, the Community Edition of Docker is sufficient. Download the respective version for your machine at https://www.docker.com/community-edition.

To start the application:
```bash
sudo docker-compose build
sudo docker-compose up
```
To close the application:
```bash
sudo docker-compose down
```

## Deployment



## Built With

* [Node.js](https://nodejs.org/en/) - Javascript runtime for executing javascript code server-side
* [Express.js](https://expressjs.com/) - Web application framework for Node.js
* [MongoDB](https://www.mongodb.com/) - Document database (NOSQL)
* [React.js](https://reactjs.org/) - Javascript library for building user interfaces

## Authors

See the list of [contributors](https://github.com/Maalka/BEDES-Manager/contributors) who participated in this project.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details
