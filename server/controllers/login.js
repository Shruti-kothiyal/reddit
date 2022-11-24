//login.js
const User = require('../model/user')
const UserOtp=require('../model/user_otp')
const responseMessages = require('../utils/constants')
require("dotenv").config()
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userLoginController=async(req,res,next)=>{
    const email=req.body.email;
    const otp=req.body.otp;
    const password=req.body.password;
    console.log("body: ",req.body)
    if(password&&otp)
    return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid"});
    await User.findOne({
        email:email
    }).then((userFoundOrNot)=>{
        console.log("userFoundOrNot--------->",userFoundOrNot)
        if(userFoundOrNot===null){
            console.log("User is not registered")
            return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User1",Details: userFoundOrNot});
        }else{
            const userId=userFoundOrNot.id
            console.log("user id =====>",userId)
            const token = jwt.sign({ userId }, process.env.key, { expiresIn: "7d" });
            const tokenCreate = {
                Status: "Success",
                msg: "Logged in!",
                code:200,
                status:userFoundOrNot.status,
                token,
            };
            if(!password&&otp&&userFoundOrNot.status===false){
                UserOtp.findOne({
                    userId:userId
                }).then((otpFoundOrNot)=>{
                    console.log("otp found or not ",otpFoundOrNot)
                    if(otpFoundOrNot==null){
                        console.log("otp row was deleted")
                        return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User2"});
                    }else{
                        console.log("otp _________",otpFoundOrNot.otp)
                        if(otpFoundOrNot.otp===otp){
                            let date = new Date();
                            if(otpFoundOrNot.expiration_time>=date.getTime()){
                                User.findOneAndUpdate({
                                    id:userId
                                },{
                                    status:1
                                }).then((otpFound)=>{
                                    UserOtp.findOneAndRemove({userId:userId}).then((otpdeletedornot)=>{
                                        console.log("OTP collection deleted as used")
                                        return res.status(200).send(tokenCreate);
                                    })
                                })
                            }else{
                                UserOtp.findOneAndRemove({userId:userId}).then((otpdeletedornot)=>{
                                    User.findOneAndRemove({id:userId}).then((userdeletedornot)=>{
                                        console.log("otp expired, user and otp collection is deleted")
                                        return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Otp invalid,register again"});
                                    })
                                })
                            }
                        }else{
                            return res.status(404).send({Status: responseMessages.FAILED,code:"404",msg: "OTP incorrect"});
                        }
                    }
                }).catch((otpError)=>{
                    return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User3",Details: otpError});
                })
            }else if(password&&!otp&&userFoundOrNot.status===true){
                User.findOne({
                    email:email
                }).then((userFoundOrNot)=>{
                    if(userFoundOrNot===null)
                    return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User4",Details: userFoundOrNot});
                    else{
                        bcrypt.compare(
                            password,
                            userFoundOrNot.password,
                            (bErr, bResult) => {
                              if (bErr) {
                                return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"error",Details: bErr});
                              }
                              if (bResult) {
                                return res.status(200).send(tokenCreate);
                              }
                              return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Username or Password is incorrect"});
                              //return res.status(401).send({msg: "Username or password is incorrect2!",});
                            }
                          );
                    }
                })
            }else if(!password&&otp&&userFoundOrNot.status===true){
                return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"User already registered"});
            }
            else
            return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User5"});
        }
    }).catch((userEmailNotRegistered)=>{
        return res.status(404).send({ Status: responseMessages.FAILED,code:"404",msg:"Invalid User6",Details: userEmailNotRegistered});
    })

}

module.exports = {
    userLoginController, //object
};