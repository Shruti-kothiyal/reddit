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
const {createToken}=require('../middleware/createToken')
var jwt = require('jsonwebtoken');

const userValidation = require("../middleware/user.validator")
const {imageupload}=require('../middleware/imageUpload')
const {authverify}=require('../middleware/authVerify')
const authGoogle=require('../middleware/authGoogle')
const passport = require("passport")
require('../controllers/passport')

const router = require("express").Router()

router.post("/register",imageupload.fields([
    {
        name:'image',
        maxCount:1
    }
]), userValidation, userRegisterController);

router.post('/login',userLoginController)

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


router.get("/failed", (req, res) => {
    res.send("Failed")
})

router.get("/success", (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

router.get('/google',(req, res, next) => 
    {next()},
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ),
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),createToken
);

router.get('/twitter',(req, res, next) => 
    {next()},
    passport.authenticate('twitter', {
            scope:
                ['email', 'profile']
        }
    ),
);


router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/failed' })
  ,createToken
);


router.get('/facebook',(req, res, next) => 
    {next()},
    passport.authenticate('facebook'),
);


router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/failed' })
  ,createToken
);




module.exports = router;