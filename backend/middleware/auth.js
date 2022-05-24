const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const TOKEN = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // return the token
    req.auth = jwt.verify(token, TOKEN); //TOKEN in .env
    next(); 
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};