import express from 'express';
import config from './app/config';

const app = express();

app.get("/",(req,res)=>{
    res.send({
        status:true,
        message:`Server is running at ${config.port}`
    })
})

export default app;
