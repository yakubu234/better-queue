const express = require("express");
const currentTime = require('./timer');
const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());

const q = require('./job/queue'); // Import the  queue instance // uses internal memeory
const queue = require('./job/queue.function'); // Import the queue instance with an embeded function // uses internal memeory
const queuePgSql = require('./job/queue.database');  // Import the queue instance  // uses pg sql memeory

// Define a separate route function for queue that uses memeory and doesnt call user defined function directly
app.get("/enqueue-job", async (req, res) => {
    res.write("Job has been queued to be sent immediately it is queued.\n" + currentTime());
    res.end();

    await q.push({ x: Math.random() });
});


// Define a separate route function for queue that uses memeory and it call user defined function directly
app.post("/enqueue-job", async (req, res) => {
    res.write("Job has been queued to be sent immediately it is queued.\n" + currentTime());
    res.end();

    await queue.push({ x: Math.random() });
});


// Define a separate route function for queue that uses pgSql and doesnt call user defined function directly
app.get("/enqueue-job-sql", async (req, res) => {
    res.write("Job has been queued to be sent immediately it is queued.\n" + currentTime());
    res.end();

    await queuePgSql.push({ x: Math.random() });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});