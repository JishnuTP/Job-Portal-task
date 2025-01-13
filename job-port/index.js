const express = require("express");
const app = express()
const bodyParser= require("body-parser")
const cors = require("cors");
const morgan = require("morgan")
const dotenv = require("dotenv");
const mysqlPool = require("./config/db");
const jobroute = require("./routes/jobs.Routes")
dotenv.config();



app.use(morgan("dev"))
app.use(cors())

app.use(express.json())

const port = 5000
app.use("/api/v1",jobroute)
app.get("/", (req,res)=>{
    res.status(200).send("<h1>hiiii<h1>")
})

mysqlPool.query("SELECT 1").then(()=>{
    console.log("my sql connected");
    
    app.listen(port,()=>{
        console.log("server connected");
        
    })
}).catch((error)=>{
    console.log(error);
    
})
