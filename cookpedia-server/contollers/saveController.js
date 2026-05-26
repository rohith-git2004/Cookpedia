const saveRecipes = require('../models/saveRecipeModel')

// add to save recipe
exports.addToSaveRecipeController = async(req,res)=>{
    console.log("inside addToSaveRecipeController");
    const {id} = req.params
    const userMail = req.payload
    const {name,image} = req.body
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if (existingRecipe) {
            res.status(409).json("Recipe already in your collection! Add another!!!")
        }
        else{
            // add to model
            const newRecipe = await saveRecipes.create({
                recipeId:id,name,image,userMail
            })
            res.status(200).json(newRecipe)
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
  }
}

// get all save recipe
exports.getUserSaveRecipesController = async(req,res)=>{
    console.log("inside getUserSaveRecipesController");
    const userMail = req.payload
    try{
     const allRecipes = await saveRecipes.find({userMail})
     res.status(200).json(allRecipes)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
  }
}

// remove recipe from save recipe
exports.removeUserSaveRecipesController = async(req,res)=>{
    console.log("inside removeUserSaveRecipesController");
    const {id} = req.params
    try{
     const detailRecipe = await saveRecipes.findByIdAndDelete({_id:id})
     res.status(200).json(detailRecipe)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
  }
}