const express = require('express')
const recipeController = require('../contollers/recipeController')
const userController = require('../contollers/userController')
const downloadContoller = require('../contollers/downloadController')
const jwtMiddlware = require('../middleware/jwtMiddleware')
const adminMiddlware = require('../middleware/adminMiddleware')
const saveController = require('../contollers/saveController')
const feedbackController = require('../contollers/feedbackController')
const multerMiddleware = require('../middleware/multerMiddleware')
const router = new express.Router()

// get all recipes
router.get('/recipes',recipeController.getAllRecipesController)

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add feedback
router.post('/feedback',feedbackController.addFeedbacksController)

// get approved feedback
router.get('/feedbacks-approve',feedbackController.getApprovedFeedbackController)

// ---------------Authorized user----------------

// view recipe
router.get('/recipe/:id',jwtMiddlware,recipeController.viewRecipeController)

// related recipes
router.get('/related-recipes',jwtMiddlware,recipeController.relatedRecipeController)

// add to download
router.post('/downloads/:id',jwtMiddlware,downloadContoller.addToDownloadsContoller)

// add to save
router.post('/recipes/:id/save',jwtMiddlware,saveController.addToSaveRecipeController)

// get user save recipes
router.get('/recipe-collection',jwtMiddlware,saveController.getUserSaveRecipesController)

// remove user save recipe
router.delete('/recipe-collection/:id',jwtMiddlware,saveController.removeUserSaveRecipesController)

// gwt user download recipe list
router.get('/user-downloads',jwtMiddlware,downloadContoller.getUserDownloadListController)

// edit user picture
router.put('/user-edit',jwtMiddlware,multerMiddleware.single('picture'),userController.editUserPictureController)

// get all users
router.get('/user-list',adminMiddlware,userController.getAllUserController)

// get all download lsit
router.get('/downloads',adminMiddlware,downloadContoller.getDownloadListController)

// get all feedbacks
router.get('/feedbacks',adminMiddlware,feedbackController.getAllFeedbackController)

// update feedback status
router.put('/feedbacks/:id',adminMiddlware,feedbackController.updtaeFeedbackStatusController)

// add recipe
router.post('/recipes',adminMiddlware,recipeController.addRecipeController)

// remove recipe
router.delete('/recipes/:id',adminMiddlware,recipeController.deleteRecipeController)

// edit recipe
router.put('/recipes/:id',adminMiddlware,recipeController.editRecipeController)


module.exports = router