import 'dotenv/config';import mongoose from 'mongoose';import bcrypt from 'bcryptjs';import User from '../models/User.js';
await mongoose.connect(process.env.MONGODB_URI);
const email=process.env.ADMIN_EMAIL,password=process.env.ADMIN_PASSWORD;
if(!email||!password||password.length<12)throw new Error('Set ADMIN_EMAIL and a strong ADMIN_PASSWORD (12+ chars) in .env');
const passwordHash=await bcrypt.hash(password,12);
await User.findOneAndUpdate({email:email.toLowerCase()},{name:process.env.ADMIN_NAME||'Hospital Administrator',email:email.toLowerCase(),passwordHash,role:'super_admin',status:'active'},{upsert:true,new:true});
console.log(`Admin account ready: ${email}`);await mongoose.disconnect();
