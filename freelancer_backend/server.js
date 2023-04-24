import express from 'express';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authrouter from './routes/authroutes.js';
import jobrouter from './routes/jobroutes.js';

dotenv.config()
// initialising express
const app = express()

//middleware to parse input data
app.use(express.json())
//middleware to log http request
app.use(morgan("common"))
//to get browser cookie in req
app.use(cookie())
//to enable cors
// in localhost
//app.use(cors({credentials:true,origin:"http://localhost:5173"})) 

// in production 
app.use(express.static('freelancer_frontend/dist'));

app.use(cors({credentials:true,origin:"https://freelancer-webapp.onrender.com"})) 

app.use('/api/auth',authrouter)
app.use('/api/job',jobrouter)

mongoose.connect(process.env.MONGO_URL,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  }
).then(()=>{
    app.listen(3001,()=>{
        console.log('server is starting...')
    })
}).catch((er)=>{
    console.log(er)
})


