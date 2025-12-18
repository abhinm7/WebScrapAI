const express = require('express');
const { addTask, getTask } = require('../controller/tasksController');


const router = express.Router();

router.post('/', addTask)
router.get('/:id', getTask)

module.exports = router;