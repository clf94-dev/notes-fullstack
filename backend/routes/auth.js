
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const router = express.Router();

router.post('/sign-up', async (req, res) =>{
    const { email, password } = req.body;
    try{
        await db.User.create({
            email,
            password,
            username: email.split('@')[0],
        })
        res.status(201).json({message: 'User created successfully'})
    } catch (error){
        console.error({error})
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await db.User.findOne({where: {email}})
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const isPasswordValid = await bcrypt.compare(String(password), user.password)
 
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid password'})
        }

        const token  = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json(token);
    } catch (error){
        console.error({error})
        res.status(500).json({message: 'Internal server error'})
    }
})


export default router;