const jwt=require('jsonwebtoken');
require('dotenv').config()
const { JWT_PRIVATE_KEY } = require("../config/index");
module.exports=function(req,res,next){
    const token=req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token ');
    try {
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user=decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid token.')
    }
}