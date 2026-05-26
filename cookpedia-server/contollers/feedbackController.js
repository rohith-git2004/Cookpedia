const feedbacks = require('../models/feedbackModel')

// add to feedback
exports.addFeedbacksController = async(req,res)=>{
    console.log("addFeedbacksController");
    const {name,email,message} = req.body
    try{
      const newFeedback = await feedbacks.create({
        name,email,message
      })
      res.status(200).json(newFeedback)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// get approved feedback
exports.getApprovedFeedbackController = async(req,res)=>{
  console.log("inside getApprovedFeedbackController");
  try{
    const approvedFeedbacks = await feedbacks.find({status:{$eq:"approve"}})
    res.status(200).json(approvedFeedbacks)
  }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// get all feedback
exports.getAllFeedbackController = async(req,res)=>{
  console.log("inside getAllFeedbackController");
  try{
    const allFeedbacks = await feedbacks.find()
    res.status(200).json(allFeedbacks)
  }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// updtae feedback status
exports.updtaeFeedbackStatusController = async(req,res)=>{
  console.log("inside updtaeFeedbackStatusController");
  const {id} = req.params
  const {status} = req.body
  try{
    const existingFeedbacks = await feedbacks.findById({_id:id})
    existingFeedbacks.status = status
    await existingFeedbacks.save()
    res.status(200).json(existingFeedbacks)
  }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}