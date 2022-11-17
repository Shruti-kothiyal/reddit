const responseMessages = require('../utils/constants')
const Post=require('../model/post')
const { ObjectID } = require('bson')

const dispAllRandomPostSubreddit=async(req,res,next)=>{
    const page=req.query.page || 0
    const limit=5
    const sortFlag= parseInt(req.query.sort_flag) || 978;

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
            $unwind:'$user_post',
        },
        { $sort: {sortingField: 1}},
        //{ $sample:{size:total} }
     ]).then((result)=>{
        return res.send({ Status: responseMessages.SUCCESS, Details: result});
     }).catch((err)=>{
        console.log("Error->",err)
     })
}

module.exports={
    dispAllRandomPostSubreddit
}