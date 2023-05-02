const jwt = require("jsonwebtoken");
const { secret } = require('config.json');
//const db = require('_helpers/db');

module.exports = authorize;

function authorize(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Log-in required" });
    }

try {
    const user = jwt.verify(token, secret);
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
} catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
}
}
