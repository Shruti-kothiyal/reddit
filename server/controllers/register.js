const User = require('../model/user')
const UserOtp=require('../model/user_otp')
const bcrypt = require("bcrypt");
var otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const responseMessages = require('../utils/constants')
const { nodemailerCreateTransport,mailOptions } = require("../emailSend");
const {AddMinutesToDate} = require('../utils/helper')



const userRegisterController = async (req, res, next) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const phone_number=req.body.phone_number
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username || "";
  const img = req.file;
  let image;
  if (img) avatar = "http://localhost:3000/" + img.image[0].filename;

  await User.findOne({
    email:email,
    status:0
  }).then(async(userRegisteringAgain)=>{
    console.log("userRegisteringAgain---------> ",userRegisteringAgain)
    if(userRegisteringAgain!==null){
      const userId=userRegisteringAgain.id
      await User.findByIdAndRemove(userId)
      await UserOtp.findOneAndRemove({userId:userId})
    }
  })

  await User.findOne({
    email:email,
    status:1
  }).then((userFoundOrNot)=>{
    if(userFoundOrNot!==null)
    return res.send({ Status: responseMessages.FAILED, msg: "User already registered"});
  
  else{
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ Status: "Failure", Details: err });
      //return res.status(500).send({msg: err,});
    } else {
      var otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 2); 

      const transporter = nodemailer.createTransport(nodemailerCreateTransport);

      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      mailOptions.to=email
      mailOptions.text= `Use OTP ${otp} to access login`,
      //Send Email
      transporter.sendMail(mailOptions, async (err, response) => {
        if (err) {
          console.log("Error -> ", err);
          return res.status(400).send({ Status: "Failure", Details: err });
        } else {
          const user = new User({
              name: name,
              dob: dob,
              phone_number:phone_number,
              password: hash,
              email: email,
              username: username,
              image: image,
          }); 
          const user_otp = new UserOtp({
              otp: otp,
              expiration_time: expiration_time,
              userId:user._id
            });
            const savedUser = await user.save(); 
            const savedUserOtp=await user_otp.save()
          return res.send({ Status: responseMessages.SUCCESS, Details: savedUser});
        }
      });
    }
    
  });
}
})
};

module.exports = {
  userRegisterController, //object
};