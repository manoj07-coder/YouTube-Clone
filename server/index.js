import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();


const connect = ()=> mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to DB!');
}).catch((err)=> {throw err})

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute);
app.use('/api/user',userRoutes)
app.use('/api/videos',videoRoutes)
app.use('/api/comments',commentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(8800,()=>{
    connect();
    console.log('Server listening on port 8800...');
})