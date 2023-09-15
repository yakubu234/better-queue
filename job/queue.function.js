const Queue = require("better-queue");
const currentTime = require('../timer');

const personalFunction = (job, callback) => {
    setTimeout(() => {
        console.log(job);
        console.log("Job completed successfully " + currentTime());
        callback(null, "done");
        // callback(new Error("Job failed")); that when you try and catch inn here 
    }, 2000);
};


const q = new Queue(personalFunction, {
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