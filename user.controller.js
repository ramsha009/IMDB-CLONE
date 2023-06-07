const User = require("../model/userSchema.model");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



Router.post("/register", async(req,res)=>{
  try{

  const {user, email, password,role}=req.body;
  const ispresent = await User.findOne({email});

  if(ispresent) {
    return res.send("User is already registerd");
  }
  const createduser= await User.create({user, email,password,role});
  return res.send(createduser);
} catch (error){
  res.send({error:error.message});
}
})
Router.post("/login", async(req,res)=>{
  try{
  const {email,password}=req.body;
  const ispresent = await User.findOne({email});

  if(!ispresent) {
     return res.status(400).send("User is not registered");
  }
  const passwordMatch = await bcrypt.compare(password, ispresent.password);
  if(!passwordMatch){
 return res.status(401).send("Invalid password");
}

const payload = {userId: ispresent._id,role: ispresent.role}
const token = jwt.sign(payload, "ramsha",
{expiresIn: "5h"})
 return res.status(200).send({ message: "Logged in successfully", token});
} catch (error){
  return res.status(500).send({error:error.message});
}
})
module.exports = Router;
