const mongoose = require('mongoose')

const post=new mongoose.Schema(
    {
      subredditId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subreddit'
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      caption:String,
      body:String,
      upvotes:{
        type:Number,
        default:0
      },
      downvotes:{
        type:Number,
        default:0
      },
      post :[String],
    },
    { 
      timestamps: true 
    }
  )

module.exports = mongoose.model("post", post)