const Post=require('../model/post')
const LikeDislike=require('../model/likeDislike')
const responseMessages = require('../utils/constants')
const userLike=async(req,res,next)=>{
    const userId=req.userId
    const postid=req.body.postid
    await Post.findOne({
        id:postid
    }).then(async(postidFoundOrNot)=>{
        console.log("post id found or not ----> ",postidFoundOrNot)
        if(postidFoundOrNot===null){
            return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User",Details: postidFoundOrNot});
        }else{
            let totalUpvotes=postidFoundOrNot.upvotes
            let totDownvotes=postidFoundOrNot.downvotes
            await LikeDislike.findOne({
                userId:userId
            }).then(async(documentCreatedOrNot)=>{
                console.log("documentCreatedOrNot ----> ",documentCreatedOrNot)
                if(documentCreatedOrNot===null){
                    const likeDislike=new LikeDislike({
                        userId:userId,
                        status:1
                    })
                    await likeDislike.save().then(()=>{
                        Post.findByIdAndUpdate({_id:postidFoundOrNot.id},{
                            upvotes:totalUpvotes+1
                        }).then((savedSuccess)=>{
                            return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated",Details: savedSuccess});
                        })
                    })
                }else{  
                    if(documentCreatedOrNot.status===2){
                        Post.findByIdAndUpdate({_id:postidFoundOrNot.id},{
                            upvotes:totalUpvotes+1,
                            downvotes:totDownvotes-1,
                        }).then((savedSuccess)=>{
                            LikeDislike.findOneAndUpdate(
                                {
                                    userId:userId
                                },{
                                    status:1
                                }
                            ).then(()=>{
                                return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated 2",Details: savedSuccess});
                            })
                        })
                    }else if(documentCreatedOrNot.status===1){
                        Post.findByIdAndUpdate({_id:postidFoundOrNot.id},{
                            upvotes:totalUpvotes-1,
                        }).then((savedSuccess)=>{
                            LikeDislike.findOneAndUpdate(
                                {
                                    userId:userId
                                },{
                                    status:0
                                }
                            ).then(()=>{
                                return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated 1",Details: savedSuccess});
                            })
                        })
                    }else if(documentCreatedOrNot.status===0){
                        Post.findByIdAndUpdate({_id:postidFoundOrNot.id},{
                            upvotes:totalUpvotes+1,
                        }).then((savedSuccess)=>{
                            LikeDislike.findOneAndUpdate(
                                {
                                    userId:userId
                                },{
                                    status:1
                                }
                            ).then(()=>{
                                return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated 0",Details: savedSuccess});
                            })
                        })
                    }
                }
            })
        }
    })
}

module.exports={
    userLike
}