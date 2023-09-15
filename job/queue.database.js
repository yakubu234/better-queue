const Queue = require("better-queue");
const pg = require("pg");
const path = require("path");
const dotenv = require('dotenv');
const currentTime = require('../timer');

dotenv.config({ path: __dirname + '/../.env' })


const q = new Queue(
    (job, callback) => {
        setTimeout(() => {
            console.log(job);

            // perform your logic here
            console.log("Job completed successfully " + currentTime());
            callback(null, "done");
            // callback(new Error("Job failed")); that when you try and catch inn here 
        }, 2000);
    },
    {
        store: {
            type: 'sql',
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            dbname: process.env.DB_NAME,
        },
        concurrent: 20,
        maxRetries: 10,
        retryDelay: 1000,
        afterProcessDelay: 100,
        autoResume: true
    }
);

q.on("task_accepted", (taskId, result) => {// and the job varriable is the result here
    console.log("Task Accepted", taskId);
    console.log("Task Accepted Result", result);
});

q.on('task_finish', function (taskId, result, stats) {// and the messge in the callback is the result
    console.log("Task Finished", taskId);
    console.log("Task Finished Result", result);
})

q.on('error', function (taskId, result, stats) {// and the messge in the callback is the result// stats is the execution time
    console.log("Task error id ", taskId);
    console.log("Task error  Result ", result);
    done();
})

q.on('empty', function () { })


module.exports = q;