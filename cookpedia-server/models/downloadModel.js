const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
      recipeId:{
        type:String,
        required:true
      },
      name:{
        type:String,
        required:true
      },
      cuisine:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      count:{
        type:Number,
        required:true
      },
      userMail:{
        type:String,
        required:true
      },
})

const downloads = mongoose.model('downloads',downloadSchema)
module.exports = downloads