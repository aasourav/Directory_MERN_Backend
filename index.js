const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')
const folderRoute = require('./route/folderStructure');

const app = express()
dotenv.config();

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_Offline);
        console.log("connected to MongoDB");
    }
    catch(error){
        console.log("Error")
    }
}

app.use(express.json())
app.use(cors())
app.use('/', folderRoute)


mongoose.connection.on("disconnected",()=>{
    console.log("Mongo Is disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("Mongo Is Connected again...");
})

app.listen(9000,()=>{
    connect();
    console.log("Server On.....")
})