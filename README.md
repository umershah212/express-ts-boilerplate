# Express Typescript Boilerplate

Express typescript boilerplate for deploying RESTful APIs with Sockets using Node.js, Express, Mongoose, Nodemon, Socket.io and Multer.

# Usage

Clone the repo:

```
    git clone https://github.com/jasonpraful/express-ts-boilerplate
    cd express-boilerplate
    yarn
```

Set env vars:

```
    cp .env.example .env
    # Edit .env with your vars
```

# Includes

- **Docker** - Pre-built Docker image for running the app.
- **Logging** - Logging with Winston. Data ready to be sent to DataDog. Logs are also sent to the console.
- **CORS** - Cross-Origin Resource Sharing.
- **Mongoose** - MongoDB ORM.
- **Socket.io** - Socket.io for real-time communication.
- **TypeScript** - TypeScript for code-reuse and type-checking.
- **Editor and Prettier config** - Code editor and formatter config.
- **Nodemon** - Restart server on file changes.
- **Middleware (JWT Refresh)** - JWT Authenticate Refresh middleware.
- **Multer with S3** - Multer for file uploads to S3.
- **Sendgrid Mailer** - Sendgrid Mailer for sending emails.
- **ESBuild** - ESBuild for building the app.

# WIP

- **API Docs** - Swagger UI for API documentation.
- **Testing** - Unit and E2E testing.
- **Deployment** - Deployment to AWS.
- **Process Management** - PM2.


# Additional Usage Commands
Spin up dev server:
```
yarn dev
```
Spin up prod server:
```
yarn start
```
Build the app:
```
yarn build
```
Code Format
```
yarn code:format
```
Code Check:
```
yarn code:check
```
Code format specific files:
```
yarn code:format:specific-file [file]
```
Docker Build
```
yarn docker:build
```
Docker Compose
```
yarn docker:compose
```
Docker Build and Run
```
yarn docker:run
```

# Default Env Variables
```
APP_NAME=boilerplate
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_DB=
HASH_ROUNDS=
SERVER_LINK=http://localhost:9000/
SENDGRID_API_KEY=
JWT_SECRET=
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
AWS_REGION=eu-west-1
```

# Structure
```
.
├── src/
│   ├── controllers/
│   ├── database/
│   │   └── Models/
│   ├── handlers/
│   │   └── imageHandler/
│   ├── helpers/
│   │   ├── aws/
│   │   ├── envHelper/
│   │   ├── logger/
│   │   ├── mailer/
│   │   └── to/
│   ├── middleware/
│   │   └── authenticateJWT/
│   ├── routes/
│   │   ├── Hello/
│   │   └── Sockets/
│   ├── types/
│   ├── utils/
│   ├── index.ts
│   └── main.ts
├── .env
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── nodemon.json
└── package.json
```

# API Documentation
```WIP```

# Contribution
- PRs welcome!

# Licence
[WIP](https://github.com/jasonpraful/express-ts-boilerplate/main/LICENSE)
