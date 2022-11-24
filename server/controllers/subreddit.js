const Subreddit=require('../model/subreddit')
const responseMessages = require('../utils/constants')

const userSubReddit=async(req,res,next)=>{
    const name=req.body.name
    const description=req.body.description
    const followers=0
    const img=req.files
    let avatar,coverphoto
    if(img){
        if(img.avatar) avatar = "http://localhost:5000/avatar/" + img.avatar[0].filename;
        if(img.coverphoto) coverphoto = "http://localhost:5000/coverphoto/" + img.coverphoto[0].filename;
    }
    const subreddit=new Subreddit({
        name:name,
        description:description,
        followers:followers,
        avatar:avatar,
        coverphoto:coverphoto
    })
    await subreddit.save().then((userSubRedditSaved)=>{
        if(userSubReddit!==null)
        return res.send({ Status: responseMessages.SUCCESS, Details: userSubRedditSaved});
        else
        return res.send({ Status: responseMessages.FAILED, Details: userSubRedditSaved});
    })
}
module.exports={
    userSubReddit
}