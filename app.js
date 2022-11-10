const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('images'))
require("dotenv").config()
const mongoose = require('mongoose');
const url = "mongodb://0.0.0.0:27017/RedditDB";
const client = mongoose.connect(url).then(response => {
  console.log("connected")
}).catch(err=>{
  console.log("connection failed...")
});

//user
const UserRouter = require('./route/user.route')


app.use('/api/user', UserRouter );

app.listen(process.env.APP_PORT, () => {
  console.log(`app is listening at`,process.env.APP_PORT)
})