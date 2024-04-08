const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const jwtAuthMiddleware = (req, res, next)=>{

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message:'Unauthorized'});
    
    try {
        //verify the JWT token
       const decoded =  jwt.verify(token, process.env.JWT_SECRET);

       req.user = decoded;
       next();

    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Invalid token'})
        
    }
    
}

const generateToken = (userdata)=>{
    return jwt.sign(userdata, process.env.JWT_SECRET, {expiresIn: "2days"})
}

module.exports = {jwtAuthMiddleware, generateToken};