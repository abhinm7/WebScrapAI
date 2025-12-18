const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true
    })
});

app.post('/tasks',(req,res)=>{
    res.status(200).json({
        success:true
    })
});

app.get('/task/:id',(req,res)=>{
    res.status(200).json({
        success:true
    })
});

app.listen(PORT,()=>{
    console.log(`server running on port:${PORT}`)
})
