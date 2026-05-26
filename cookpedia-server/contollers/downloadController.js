const downloads = require('../models/downloadModel')

// add to downloads
exports.addToDownloadsContoller = async(req,res)=>{
    console.log("inside addToDownloadsContoller");
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body
    try{
        const existingRecipe = await downloads.findOne({recipeId:id})
        if (existingRecipe) {
            // increment count
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            const newRecipe = await downloads.create({
               recipeId:id,name,cuisine,image,count:1,userMail
            })
            res.status(200).json(newRecipe)
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// get user download list
exports.getUserDownloadListController = async(req,res)=>{
    console.log("inside getUserDownloadListController");
    const userMail = req.payload
    try{
       const allUserRecipes = await downloads.find({userMail})
       res.status(200).json(allUserRecipes)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// get all download list
exports.getDownloadListController = async(req,res)=>{
    console.log("inside getDownloadListController");
    try{
       const allDownloads = await downloads.find()
       res.status(200).json(allDownloads)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}