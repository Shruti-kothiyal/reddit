const UserComment=require('../model/userComment')
const responseMessages = require('../utils/constants')
const mongoose = require("mongoose");

const dispAllComment=async(req,res,next)=>{
    const postId=req.query.postId
    const ObjectId = mongoose.Types.ObjectId;
    await UserComment.aggregate([
        {
            $lookup:{
                from:"usercomments",
                localField:"_id",
                foreignField:"mainCommentId",
                as:"reply",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"userId",
                            foreignField:"_id",
                            as:"user"
                        }
                    }
                ]
            }
        },
        {
            $match:{
                "mainCommentId":null,
                "postId":ObjectId(postId)
            }
        },{
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user"
            }
        },
    ]).then((result)=>{
        return res.send({ Status: responseMessages.SUCCESS, Details: result});
     }).catch((err)=>{
        console.log("Error->",err)
     })
}

module.exports={
    dispAllComment
}