const Post=require('../model/post')
const responseMessages = require('../utils/constants')

const dispAllPost=async(req,res,next)=>{
    await Post.find().then((dispAllPost)=>{
        if(dispAllPost!==null)
        return res.send({ Status: responseMessages.SUCCESS, Details: dispAllPost});
    })
}

module.exports={
    dispAllPost
}