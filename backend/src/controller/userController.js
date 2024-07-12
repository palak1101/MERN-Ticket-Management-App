import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY } from '../config/recaptchaKeys.js';
import { RecaptchaV2 } from "express-recaptcha";

const recaptcha = new RecaptchaV2(RECAPTCHA_SITE_KEY,RECAPTCHA_SECRET_KEY);

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUser = asyncHandler(async(req,res)=>{
  const id = req.params.id
  const user = await User.findById(id)

  if(!user){
      throw new Error(`User id ${id} not found`)
  }
  res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body; 

  const user = await User.findById(id);

  if (user && (await bcrypt.compare(password, user.password))) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword; 
    await user.save(); 

    res.status(200).json({ message: 'Password updated successfully' });
  } else {
    res.status(400).json({ message: 'Invalid user or password' });
  }
});

const registerUser = asyncHandler(async(req,res) => {

  const {fullName,email,password} = req.body
  if(!fullName|| !email || !password){

      res.status(400)
      throw new Error('Please include all fields')
  }
  const userExists = await User.findOne({email})
  if(userExists){
      res.status(400)
      throw new Error ('User already exists')
  }
  //Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  const user = await User.create({fullName,email,password:hashedPassword})
  if(user){
      res.status(201).json({
          _id:user._id,
          fullName:user.fullName,

          email:user.email,
          token: generateToken(user._id)
      })
  }
  else{
      res.status(401)
      throw new Error("Invalid details")
  }
})


const loginUser = asyncHandler(async (req, res, next) => {
  try {
      recaptcha.middleware.verify(req, res, async (err) => {
          if (err) {
              console.error('reCAPTCHA verification failed:', err);
              return res.status(400).json({ message: 'reCAPTCHA verification failed' });
          }

          const { email, password } = req.body;

          try {
              const user = await User.findOne({ email });

              if (user && bcrypt.compareSync(password, user.password)) {
                  return res.status(200).json({
                      _id: user.id,
                      fullName: user.fullName,
                      email: user.email,
                      token: generateToken(user._id),
                  });
              } else {
                  return res.status(401).json({ message: 'Invalid credentials' });
              }
          } catch (error) {
              console.error('Error finding user:', error);
              return res.status(500).json({ message: 'Internal server error' });
          }
      });
  } catch (error) {
      console.error('Error logging in:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
  }
});
 
const generateToken = id => jwt.sign({id},'password',{expiresIn:'30d'})

export default { getAllUsers, getUser, updateUser, loginUser, changePassword, registerUser };
