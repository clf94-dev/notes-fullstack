const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('user/profile', async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId)
        if (!user){
            res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user, {
            exclude: ['passowrd, createdAt', 'updatedAt']
        })
    } catch (error) {
        res.status(500).json({message: 'Interval server error' })
    }
})

router.post('user/reset-password', async (req, res) => {
    const { oldPassword, newPassword, } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        const user = await User.findByPk(userId)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        if(user.password !== oldPassword){
            return res.status(400).json({message: 'Old password is incorrect'})
        }
        if(user.password === newPassword){
            return res.status(400).json({message:'New password cannot be the same as the old password'})
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({message: 'Password updated successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }

})