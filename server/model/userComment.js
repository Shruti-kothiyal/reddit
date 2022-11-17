const { boolean } = require('joi')
const mongoose = require('mongoose')

const userComment=new mongoose.Schema(
    {
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
          },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        body:String,
        like:{
            type:Number,
            default:0
        },
        dislike:{
            type:Number,
            default:0
        },
        reply:{
            type: Boolean,
            default:0
        },
        mainCommentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userComment',
            default:null
        }
    },
    { 
      timestamps: true 
    }
    
)

module.exports = mongoose.model("userComment", userComment)