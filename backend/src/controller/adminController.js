import Admin from '../model/adminModel'
import asyncHandler from "express-async-handler";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginAdmin = asyncHandler(async(req,res) => {
  const {email,password} = req.body
  
  const adminExists = await Admin.findOne({email})
  if(adminExists && (await bcrypt.compare(password,adminExists.password))){
      res.status(200).json({
          _id:adminExists.id,
          name:adminExists.name,
          email:adminExists.email,
          token: generateToken(adminExists._id)
      })
     
  }
  else{
      res.status(401)
      throw new Error("Invalid credentials")
  }
 
})

const generateToken = id => jwt.sign({id},'password',{expiresIn:'30d'})

export default {loginAdmin}
