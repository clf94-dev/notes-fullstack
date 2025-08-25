
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader){
        res.status(401).json({message: 'Authorization header is missing'})
    }
    const [scheme, token] = req.headers['authorization'].split(' ');
    if (scheme !== 'Bearer' || !token) {
        res.status(401).json({message: 'Invalid token format'})
    }


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error){
        res.status(401).json({message: 'Invalid token'})
    }
}


module.exports = authMiddleware;