require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/taskRoute');
const cors = require('cors')

app.use(express.json());
app.use(cors());

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
