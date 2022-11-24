const UserComment=require('../model/userComment')
const responseMessages = require('../utils/constants')

const dispAllComment=async(req,res,next)=>{
    await UserComment.aggregate([
        // {
        //     $lookup:{
        //         from:"usercomments",
        //         localField:"_id",
        //         foreignField:"mainCommentId",
        //         as:"reply"
        //     }
        // },
        {
            $lookup:{
                from:"usercomments",
                localField:"_id",
                foreignField:"mainCommentId",
                as:"reply"
            }
        }
        
    ]).then((result)=>{
        return res.send({ Status: responseMessages.SUCCESS, Details: result});
     }).catch((err)=>{
        console.log("Error->",err)
     })
}

module.exports={
    dispAllComment
}