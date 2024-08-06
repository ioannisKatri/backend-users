# Backend Test

Basic setup for the backend engineer test.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Testing](#testing)

## Prerequisites

- Docker installed on your machine. You can download it from [here](https://www.docker.com/get-started).
- Docker Compose installed. Installation instructions can be found [here](https://docs.docker.com/compose/install/).
- Node.js installed on your machine (version 14.x or higher recommended). You can download it
  from [here](https://nodejs.org/).

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd backend-test
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` as needed

## Running the Project

1. **Build and run docker image**
   ```sh
   docker-compose up -d --build
   ```

2. **Generate Prisma client**
   ```sh
   npm run prisma:db:push
   ```

3. **Start the Node.js application**:
    ```sh
    npm run start
    ```

## API Documentation

Swagger documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)`.

## Testing

### Database Schema for Tests

The tests are saved in the database schema with the name tests.

### Running Tests

If running tests for the first time, you need to push the schema to the test database. To do this, run the following command:
```sh
npm run test:db:push
```

To run the tests, use the following command:

```sh
npm run test
```

This will execute your test suite and check if everything is working as expected.