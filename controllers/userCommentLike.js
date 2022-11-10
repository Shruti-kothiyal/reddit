const CommentLikeDislike=require('../model/commentLikeDislike')
const UserComment=require('../model/userComment')
const responseMessages = require('../utils/constants')
const userCommentLike=async(req,res,next)=>{
    const userId=req.userId
    const commentid=req.body.commentid
    await UserComment.findOne({
        id:commentid
    }).then(async(commentidFoundOrNot)=>{
        console.log("post id found or not ----> ",commentidFoundOrNot)
        if(commentidFoundOrNot===null){
            return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User",Details: commentidFoundOrNot});
        }else{
            let totLikes=commentidFoundOrNot.like
            let totDislikes=commentidFoundOrNot.dislike
            await CommentLikeDislike.findOne({
                userId:userId
            }).then(async(documentCreatedOrNot)=>{
                console.log("documentCreatedOrNot ----> ",documentCreatedOrNot)
                if(documentCreatedOrNot===null){
                    const commentLikeDislike=new CommentLikeDislike({
                        userId:userId,
                        status:1
                    })
                    await commentLikeDislike.save().then(()=>{
                        UserComment.findByIdAndUpdate({_id:commentidFoundOrNot.id},{
                            like:totLikes+1
                        }).then((savedSuccess)=>{
                            return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated",Details: savedSuccess});
                        })
                    })
                }else{  
                    if(documentCreatedOrNot.status===2){
                        UserComment.findByIdAndUpdate({_id:commentidFoundOrNot.id},{
                            like:totLikes+1,
                            dislike:totDislikes-1,
                        }).then((savedSuccess)=>{
                            CommentLikeDislike.findOneAndUpdate(
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
                        UserComment.findByIdAndUpdate({_id:commentidFoundOrNot.id},{
                            like:totLikes-1,
                        }).then((savedSuccess)=>{
                            CommentLikeDislike.findOneAndUpdate(
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
                        UserComment.findByIdAndUpdate({_id:commentidFoundOrNot.id},{
                            like:totLikes+1,
                        }).then((savedSuccess)=>{
                            CommentLikeDislike.findOneAndUpdate(
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
    userCommentLike
}