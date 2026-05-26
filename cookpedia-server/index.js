require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const router = require('./routes/routing')


const cookPedia = express()

cookPedia.use(cors())
cookPedia.use(express.json())
cookPedia.use(router)
cookPedia.use('/uploads',express.static('./uploads'))

const PORT = 3000

cookPedia.listen(PORT,()=>{
    console.log("Server started listening");
})

cookPedia.get('/',(req,res)=>{
  res.status(200).send("Server started listening")
})