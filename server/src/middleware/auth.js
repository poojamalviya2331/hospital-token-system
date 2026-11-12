import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req,res,next){
  try {
    const header=req.headers.authorization||'';
    const token=header.startsWith('Bearer ')?header.slice(7):null;
    if(!token) return res.status(401).json({message:'Authentication required'});
    const payload=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    const user=await User.findById(payload.sub).select('-passwordHash');
    if(!user||user.status!=='active') return res.status(401).json({message:'Account unavailable'});
    req.user=user; next();
  } catch { return res.status(401).json({message:'Invalid or expired session'}); }
}
export const allowRoles=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:'Permission denied'});
