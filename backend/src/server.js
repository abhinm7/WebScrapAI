const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/taskRoute');

app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({
        success: true
    })
});

app.use('/tasks', router);

app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`)
})
