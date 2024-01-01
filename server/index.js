import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

const connect = ()=> mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to DB!');
}).catch((err)=> {throw err})

app.listen(8800,()=>{
    connect();
    console.log('Server listening on port 8800...');
})