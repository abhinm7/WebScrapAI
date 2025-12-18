const { taskQueue } = require("../background/queue");
const { get } = require("../routes/taskRoute");
const { createTask, fetchTask } = require("../db/queries")

const addTask = async (req, res) => {

    const { url, question } = req.body;

    if (!url || !question) {
        res.status(400).json({
            success: false,
            error: 'url and question are mandatory'
        })
    }

    const job = await taskQueue.add('scrap-task', {
        url, question
    })

    createTask({
        id: job.id,
        url,
        question,
        status: "queued",
    })

    res.status(200).json({
        success: true,
        created: job.id
    })
}

const getTask = async (req, res) => {
    const id = req.params.id;
    const task = await fetchTask(id);
    res.json({
        id,
        task
    })
}

module.exports = { addTask, getTask }