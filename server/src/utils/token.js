import jwt from 'jsonwebtoken';
export const signAccessToken = (user) => jwt.sign(
  { sub: user._id.toString(), role: user.role, name: user.name },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' }
);
