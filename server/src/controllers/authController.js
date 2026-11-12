import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {signAccessToken} from '../utils/token.js';
export async function login(req,res){
 const {email,password}=req.body;
 if(!email||!password) return res.status(400).json({message:'Email and password are required'});
 const user=await User.findOne({email:email.toLowerCase()});
 if(!user||user.status!=='active'||!(await bcrypt.compare(password,user.passwordHash))) return res.status(401).json({message:'Invalid email or password'});
 user.lastLoginAt=new Date(); await user.save();
 res.json({token:signAccessToken(user),user:{id:user._id,name:user.name,email:user.email,role:user.role}});
}
export async function me(req,res){res.json({user:{id:req.user._id,name:req.user.name,email:req.user.email,role:req.user.role}});}
