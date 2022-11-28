const responseMessages = require('../utils/constants')
const Post=require('../model/post')
const mongoose = require("mongoose");

const dispAllRandomPostSubreddit=async(req,res,next)=>{
    const page=req.query.page || 0
    const limit=10
    const sortFlag= parseInt(req.query.sort_flag) || 978;
    const ObjectId = mongoose.Types.ObjectId;
    const subredditId=req.query.subredditId || "637c7b0f7cee1461a0093755"

     await Post.aggregate([
        {
            $skip:page*limit,
        },
        {
            $limit:limit
        },
        {
            $addFields: { random: {$toLong: '$createdAt'}}
        },
        {
            $addFields: { sortingField: { $mod: [ '$random', sortFlag]}}
        },
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
            },
        },
        {
            $match:{
                "subredditId":ObjectId(subredditId)
            }
        },
        {
            $unwind:'$user_post',
        },
        { $sort: {sortingField: 1}},
        //{ $sample:{size:total} }
     ]).then((result)=>{
        //console.log("result ---> ",result)
        return res.send({ Status: responseMessages.SUCCESS, Details: result});
     }).catch((err)=>{
        console.log("Error->",err)
     })
}

module.exports={
    dispAllRandomPostSubreddit
}