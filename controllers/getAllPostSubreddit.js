const responseMessages = require('../utils/constants')
const Post=require('../model/post')

const dispAllPostSubreddit=async(req,res,next)=>{

     await Post.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                pipeline: [{ $project: {
                    username: 1,
                    email: 1,
                    avatar: 1
                }}],
                as:"user_post"
            }
        },
        {
            $unwind:'$user_post',
        },
     ]).then((result)=>{
        return res.send({ Status: responseMessages.SUCCESS, Details: result});
     }).catch((err)=>{
        console.log("Error->",err)
     })
}

module.exports={
    dispAllPostSubreddit
}