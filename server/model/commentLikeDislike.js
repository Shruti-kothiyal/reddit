const mongoose = require('mongoose')

const commentLikeDislike=new mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      status:{
        type:Number,
        default:0
      },
    }
  )

module.exports = mongoose.model("commentLikeDislike", commentLikeDislike)