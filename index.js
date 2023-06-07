const express = require("express");
const app = express();
const connect = require("./config/db");
const usercontroller = require("./controllers/user.controller");
const moviecontroller = require("./controllers/movie.controller");
const bcrypt = require('bcrypt');

console.log("1234")
const hash = bcrypt.hashSync("1234", 10);
console.log(hash)



app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 8080;
app.use("/user", usercontroller);
app.use("/movie", moviecontroller);



app.listen(port, async ()=>{
  try{
    await connect();
    console.log("Listening to my port on ${port}");
  } catch (error){
    console.log({error: error.message});
  }


})
