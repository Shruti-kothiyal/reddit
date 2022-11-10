const { userRegisterController } = require("../controllers/register")
const {userLoginController}=require('../controllers/login')
const {userSubReddit}=require('../controllers/subreddit')
const {userPost}=require('../controllers/post')
const {dispAllPost}=require('../controllers/subredditDisp')
const {dispAllPostSubreddit}=require('../controllers/getAllPostSubreddit')
const {dispAllRandomPostSubreddit}=require('../controllers/getRandomAllPost')
const {userLike}=require('../controllers/like')
const {userDislike}=require('../controllers/dislike')
const {userComment}=require('../controllers/userComment')
const {userCommentLike}=require('../controllers/userCommentLike')
const {userCommentDislike}=require('../controllers/userCommentdislike')
const {dispAllComment}=require('../controllers/displayUserComment')
const {googleSignup}=require('../controllers/userController')

const userValidation = require("../middleware/user.validator")
const {imageupload}=require('../middleware/imageUpload')
const {authverify}=require('../middleware/authVerify')
const authGoogle=require('../middleware/authGoogle')
const user = require("../model/user")

const router = require("express").Router()

router.post("/register",imageupload.fields([
    {
        name:'image',
        maxCount:1
    }
]), userValidation, userRegisterController);

router.get('/login',userLoginController)

router.post('/subreddit',imageupload.fields([
    {
        name:'avatar',
        maxCount:1
    },
    {
        name:'coverphoto',
        maxCount:1
    },
]),authverify,userSubReddit)

router.post('/post',imageupload.fields([
    {
        name:'post',
        maxCount:5
    }
]),authverify,userPost)

router.get('/getallpost',dispAllPost)

router.get('/getAllPostInSubreddit',dispAllPostSubreddit)

router.get('/getAllRandomPostInSubreddit',dispAllRandomPostSubreddit)

router.post('/like',authverify,userLike)

router.post('/dislike',authverify,userDislike)

router.post('/comment',authverify,userComment)

router.get('/displayComment',dispAllComment)

router.post('/commentLike',authverify,userCommentLike)

router.post('/commentDislike',authverify,userCommentDislike)

router.post('/v1/users/google',authGoogle,googleSignup)


module.exports = router;