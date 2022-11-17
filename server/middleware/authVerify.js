var jwt = require('jsonwebtoken');

const authverify = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.key, (err, decoded) => {
      if (err) {
        return res.json({ message: "token is not valid" });
      } else {
        console.log("decoded",decoded)
        req.userId = decoded.userId;
        console.log("use id in authVerify ",req.userId)
        next();
      }
    });
};

module.exports = {
    authverify, 
};