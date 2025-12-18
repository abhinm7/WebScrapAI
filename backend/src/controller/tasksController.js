const { taskQueue } = require("../background/queue");
const { get } = require("../routes/taskRoute");

const addTask = async (req, res) => {

    const { url, question } = req.body;

    if (!url || !question) {
        res.status(400).json({
            success: false,
            error: 'url and question are mandatory'
        })
    }

    const job = await taskQueue.add('scrap-task',{
          url,question
    })

    res.status(200).json({
        success: true,
        created:job.id
    })
}

const getTask = (req, res) => {
    const id = req.params.id;
    res.json({
        id
    })
}

module.exports = { addTask, getTask }