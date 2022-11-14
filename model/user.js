const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    dob: Date,
    email: String,
    password: String,
    phone_number: Number,
    image: String,
    status: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods = {
  
  createToken() {
    return jwt.sign({userId: this._id},process.env.key, { expiresIn: "7d" });
  },
  toAuthJSON() {
    console.log(this.username, this._id)
    return {
      username: this.username,
      token: this.createToken(),
    };
  },
};

module.exports = mongoose.model("user", userSchema);
