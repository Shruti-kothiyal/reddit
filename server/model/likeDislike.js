const mongoose = require('mongoose')

const likeDislike=new mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      status:{
        type:Number,
        default:null
      },
    }
  )

module.exports = mongoose.model("likeDislike", likeDislike)