const Post=require('../model/post')
const Subreddit=require('../model/subreddit')
const responseMessages = require('../utils/constants')

const userPost=async(req,res,next)=>{
    const userId=req.userId
    const caption=req.body.caption
    const body=req.body.body
    const upvotes=0
    const downvotes=0
    let postimg
    const img=req.files
    console.log(img)
    if(img){
        postimg=img.post.map((imageName)=>"http://localhost:3000/post/"+imageName.filename)
    }
    console.log("useid ====> ",userId)
    Subreddit.findOne({
        userId:userId
    }).then(async(subredditIdFoundOrNot)=>{
        console.log("subredditIdFoundOrNot -----> ",subredditIdFoundOrNot)
        if(subredditIdFoundOrNot!==null){
            const post=new Post({
                subredditId:subredditIdFoundOrNot.id,
                userId:userId,
                caption:caption,
                body:body,
                upvotes:upvotes,
                downvotes:downvotes,
                post:postimg
            })
            await post.save().then((userPostSaved)=>{
                if(userPostSaved!==null)
                return res.send({ Status: responseMessages.SUCCESS, Details: userPostSaved});
                else
                return res.send({ Status: responseMessages.FAILED, Details: userPostSaved});
            })
        }
    })
    
}

module.exports={
    userPost
}