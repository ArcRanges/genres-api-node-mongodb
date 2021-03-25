# Genres REST API

_A REST API built using NodeJS, ExpressJS, and MongoDB._

_Live Demo: https://warm-escarpment-31278.herokuapp.com/api/genres_

## Dependencies (At time of initialization)

- NodeJS: 12.18.9 - runtime environment
- bcrypt: 5.0.1 - generating and hashed passwords
- compression: 1.7.4 - serving compressed html files
- config: 3.3.6 - similar to dotenv for environment configurations
- express: 4.17.1 - Node's backend web app framework
- express-async-errors: 3.1.1 - try/catch patch in network failures
- helmet: 4.4.1 - security headers
- joi: 17.4.0 - data validations
- joi-objectid: 3.0.1 - extention for mongoose
- jsonwebtoken: 8.5.1 - authentication and authorization
- lodash: 4.17.21 - array & object manipluations
- mongodb: 3.6.5 - backend NoSQL database
- mongoose: 5.12.1 - framework for connecting with mongodb
- winston: 3.3.3 - logging information to files
- winston-mongodb: 5.0.7 - winston helper to connect with mongodb

## Before you run

- Make sure you're running mongodb locally or have configured /config/default.json.

- For running in development, run

```
export NODE_ENV=dev
export genres_jwtPrivateKey=exampleSecretKey
```

- For running tests, make sure you've exported NODE_ENV=test

```
export NODE_ENV=test
```

## Instructions

```
git clone <this repo>
cd <this repo's name>
npm i
node index.js
```
