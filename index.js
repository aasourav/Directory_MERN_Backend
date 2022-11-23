const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')
const folderRoute = require('./route/folderStructure');

const app = express()
dotenv.config();

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_Online);
        console.log("connected to MongoDB");
    }
    catch(error){
        console.log("Error")
    }
}

app.use(express.json())
app.use(cors({origin:'https://directory-mern-frontend.vercel.app'}))
app.use((req, res, next) => {
    const allowedOrigins = ['https://directory-mern-frontend.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    return next();
  })
app.use('/', folderRoute)


mongoose.connection.on("disconnected",()=>{
    console.log("Mongo Is disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("Mongo Is Connected again...");
})
const port = process.env.PORT || 9000
app.listen(port,()=>{
    connect();
    console.log("Server On.....")
})