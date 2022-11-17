const mongoose = require('mongoose')

const user_otpSchema=new mongoose.Schema(
    {
      otp:String,
      expiration_time:{type:Date},
      userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }, 
    { 
      timestamps: true 
    }
  )

module.exports = mongoose.model("user_otp", user_otpSchema)