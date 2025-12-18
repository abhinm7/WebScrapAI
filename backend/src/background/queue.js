const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL,
    { maxRetriesPerRequest: null }
);

const taskQueue = new Queue('tasks', {
    connection
});

module.exports = { taskQueue, connection }