var CryptoJS = require("crypto-js");
require("dotenv").config()

const userEncryptDecrypt = async (req, res, next) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const password = req.body.password;
    const email = req.body.email;
    const phone_number=req.body.phone_number;
    const username = req.body.username;
    const img = req.file;
    let image;
    if (img) image = "http://localhost:"+process.env.APP_PORT+"/" + img["filename"];
    const payload = {
		name: name,
        dob: dob,
        password: password,
        email: email,
        phone_number:phone_number,
        username: username,
        image: image,
	};
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.key).toString();

if (!ciphertext) {
    return res.status(406).send({ Status: "Failure", Details: ciphertext });
} else {
    next();
}
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, process.env.key);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText);
console.log(ciphertext);
}

module.exports = userEncryptDecrypt