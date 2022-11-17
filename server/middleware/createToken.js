var jwt = require('jsonwebtoken');
const createToken = async (req, res,next)=>{
    console.log("userid haha ",req.user)
    const userId=req.user.id
    const token = jwt.sign({ userId }, process.env.key, { expiresIn: "7d" });
    const tokenCreate = {
    Status: "Success",
    msg: "Logged in!",
    code: 200,
    token,
    };
    return res.status(200).send(tokenCreate);
}
module.exports={createToken}
