const nodemailerCreateTransport={
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
}
const mailOptions = {
  from: `projectrandom1@outlook.com`,
  //to: `${email}`,
  subject: "OTP",
  //text: `Use OTP ${otp} to access login`,
};

module.exports={
    nodemailerCreateTransport, 
    mailOptions
}