# Project Description

This project utilizes the [better-queue](https://github.com/diamondio/better-queue/blob/master/README.md) library and provides examples of using it with both in-memory and post-egress SQL data stores.

## Queue Options

The individual queue options can be found in the `job` folder:

- `queue.database.js`: This syntax uses the PostgreSQL database as its datastore for the queue.
- `queue.function.js`: This syntax uses in-memory/RAM as its datastore and also modifies some implementations, like directly passing or integrating a function that should be processed immediately when the queue is pushed.
- `queue.js`: This syntax uses in-memory/RAM as its datastore and then passes the variable `JOB` containing any data that is to be processed.

## Main Application

The `index.js` file is the main application file that initializes an Express app with three endpoints used to test the three different queue connection/implementation options:

```javascript
const q = require('./job/queue'); // Import the queue instance // uses internal memory
const queue = require('./job/queue.function'); // Import the queue instance with an embedded function // uses internal memory
const queuePgSql = require('./job/queue.database'); // Import the queue instance // uses PostgreSQL memory

// Define a separate route function for the queue that uses memory and doesn't call a user-defined function directly
app.get("/enqueue-job", async (req, res) => {
    // ... Endpoint logic ...
});

// Define a separate route function for the queue that uses memory and calls a user-defined function directly
app.post("/enqueue-job", async (req, res) => {
    // ... Endpoint logic ...
});

// Define a separate route function for the queue that uses PostgreSQL and doesn't call a user-defined function directly
app.get("/enqueue-job-sql", async (req, res) => {
    // ... Endpoint logic ...
});

```

## Timer

The `timer.js` file contains an epoch timestamp used to track when the queue executes and when you receive a normal response from the endpoint. It is implemented to test if the queue is executing asynchronously and if the response from the endpoint is not waiting for the complete execution of the queue.

## Required Packages

The following packages need to be installed as dependencies and devDependencies:

**Dependencies:**

## Dependencies

The following dependencies are needed to run this project:

- `better-queue`: A queue library for Node.js.
- `better-queue-sql`: A PostgreSQL adapter for the better-queue library.
- `dotenv`: A module for loading environment variables from a `.env` file.
- `express`: A web framework for Node.js.
- `pg`: A PostgreSQL database driver for Node.js.
- `nodemon`: A tool for monitoring and restarting Node.js applications.

```json
"dependencies": {
    "better-queue": "3.8.10",
    "better-queue-sql": "^1.0.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.3"
}

```

### You can install these packages using your preferred package manager

```bash
npm install
```

inside the applications root directory

then to start the app you can use any of the below command

```bash
node index.js

```

or

```bash
nodemon index.js 
```

or

```bash
npm run start

```

This will start your Express application and make it available at the specified endpoints for testing the different queue implementations.

## Testing

You can test the project by accessing the following endpoints:

1. `/enqueue-job`: Enqueues a job using in-memory storage without calling a user-defined function directly.

2. `/enqueue-job`: Enqueues a job using in-memory storage and calls a user-defined function directly.

3. `/enqueue-job-sql`: Enqueues a job using PostgreSQL storage without calling a user-defined function directly.

Use these endpoints to verify the behavior and performance of the different queue implementations.

For more information on the [better-queue library](https://github.com/diamondio/better-queue), please refer to the official documentation.

## Conclusion

This project demonstrates the usage of the better-queue library with various queue implementations, allowing you to choose between in-memory and PostgreSQL-backed queues for your specific use cases. The provided endpoints in the Express application offer a convenient way to test the functionality of each queue type.

Feel free to explore and modify the code to suit your project's requirements and use it as a reference for integrating queues into your applications.
