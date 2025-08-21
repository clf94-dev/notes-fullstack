const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Tag } = require('../models');

router.get('/tags', async (req, res) => {
    const userId = req.user.id;
    try {
        const tags = await Tag.findAll({
            where: {userId},
            attributes: ['id', 'name']
        });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/tag', async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const tag = await Tag.create({
            name, 
            userId
        })

        const existingTag = await Tag.findOne({
            where: {name, userId}
        })
        res.status(201).json(existingTag.id)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})