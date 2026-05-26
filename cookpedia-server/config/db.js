const mongoose = require('mongoose')

const connectionString = process.env.ATLASBDCOLLECTION

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB connection Successfull");
}).catch(err=>{
    console.log(err);
    console.log("MongoDB connection failed");
})