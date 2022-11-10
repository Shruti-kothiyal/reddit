const mongoose = require('mongoose')

const subreddit=new mongoose.Schema(
    {
      name:String,
      description:String,
      followers:{
        type:Number,
        default:0
      },
      avatar:{
        type:String,
        default:null
      },
      coverphoto:{
        type:String,
        default:null
      },
    }, 
    { 
      timestamps: true 
    }
  )

module.exports = mongoose.model("subreddit", subreddit)