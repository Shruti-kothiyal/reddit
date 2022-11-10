const User = require('../model/user')
const HTTPStatus =require("http-status");
const googleSignup = async (req, res, next) => {
res.status(HTTPStatus.CREATED).json(req.user.toAuthJSON());
return next();
};
module.exports = {
    googleSignup, 
};