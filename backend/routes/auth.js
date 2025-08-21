const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/sign-up', async (req, res) =>{
    const { email, password } = req.body;
    try {
        const user = await User.create({
            email,
            password,
            username: email.split('@')[0],
        })
        res.status(201).json({message: 'User created successfully'})
    } catch (error){
        console.error('Error creating user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        if(bcrypt.compare(password, user.password)){
            return res.status(401).json({message: 'Invalid password'})
        }

        user.lastLogin = newDate();
        await user.save();
        res.status(200).json({message: 'Login successfull'})
    } catch (error){
        res.status(500).json({message: 'Internal server error'})
    }
})


