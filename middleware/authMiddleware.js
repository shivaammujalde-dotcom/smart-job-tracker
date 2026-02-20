import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const match =
    typeof authHeader === 'string'
      ? authHeader.match(/^Bearer\s+(.+)$/i)
      : null;

  if (!match) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const rawToken = match[1].trim();
  const normalized = rawToken
    .replace(/^Bearer\s+/i, '')
    .replace(/[{}"]/g, '')
    .trim();
  const jwtMatch = normalized.match(/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/);
  const token = jwtMatch ? jwtMatch[0] : normalized;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized, token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;
