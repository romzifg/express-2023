# REST API Online Shop
## Description
Rest Api for online shop using Javascript, Express js and database MySQL.

Make sure you have installed git and node js on your device.
otherwise, you can download it at
- [GIT](https://git-scm.com/)
- [NODE](https://nodejs.org/en)

Clone the project
```bash
  git clone https://github.com/romzifg/express-backend.git
```

Install package
```bash
  npm install
```

Env setup
```bash
  PORT=4000
  DB_DATABASE={YOUR_DB_NAME}
  DB_HOST={YOUR_DB_HOST}
  DB_PORT={YOU_DB_PORT}
  DB_USERNAME={YOUR_DB_USERNAME}
  DB_PASSWORD={YOUR_DB_PASSWORD}
  DB_CONNECTION={YOUR_DB_CONNECTION}
  NODE_ENV=development
  
  JWT_SECRET= {YOUR_JWT_SECRET}
  JWT_EXPIRES_IN= 6d
  JWT_COOKIE_EXPIRES_IN= 6
```

For migration database
```bash
  npx sequelize-cli db:migrate
```

## Authors
- [@romzifg](https://github.com/romzifg)
