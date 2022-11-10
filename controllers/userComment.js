const Post=require('../model/post')
const UserComment=require('../model/userComment')
const responseMessages = require('../utils/constants')
const userComment=async(req,res,next)=>{
    const userId=req.userId
    const postid=req.body.postid
    const body=req.body.body
    const mainCommentId=req.body.mainCommentId
    await Post.findOne({
        id:postid
    }).then(async(postidFoundOrNot)=>{
        if(postidFoundOrNot===null){
            return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User",Details: postidFoundOrNot});
        }
        else{
            const createComment={
                postId:postidFoundOrNot.id,
                userId:userId,
                body:body
            }
            if(mainCommentId!==null){
                createComment.reply=1
                createComment.mainCommentId=mainCommentId
            }
            const userComment=new UserComment(createComment)
            
            await userComment.save().then((savedSuccess)=>{
                return res.status(200).send({ Status: responseMessages.SUCCESS,code:"200",msg:"Updated",Details: savedSuccess});
            })

        }
    })
}

module.exports={
    userComment
}