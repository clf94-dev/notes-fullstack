const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
    const userId = req.user.userId;
    try {
        console.log('get /notes',{userId})
        const notes = await db.Note.findAll({
            where: {userId},
            include: [{
                model: db.Tag,
                as: 'tags',
                attributes: ['id', 'name'],
                required: true, 
                through: { attributes: [] } // Exclude junction table attributes
            }]
        })
        console.log({notes})
        res.status(200).json(notes)
    } catch (error) {
        console.error("GET /notes error:", error);
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/note', async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.user.userId;

    try {
        const note = await db.Note.create({
            title, 
            content, 
            tags, 
            userId
        })
        if (tags && tags.length > 0) {
            const tagInstances = await db.Tag.findAll({
                where: { id: tags }
            });
            await note.setTag(tagInstances);
        }
        res.status(201).json({message: 'Note created successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.put('/note/:id', async (req, res)=> {
    const { id } = req.params;
    const { title, content, tags} = req.body;
    const userId = req.user.userId;

    try {
        const note =  await db.Note.findOne({
            where: {id, userId}
        })

        if (!note) {
            return res.status(404).json({message: 'Note not found'})
        }

        note.title = title;
        note.content = content;
        if (tags && tags.length > 0) {
            const tagInstances = await db.Tag.findAll({
                where: {id: tags}
            })
            await note.setTag(tagInstances)
        }
        await note.save();

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.delete('/note/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const note = await db.Note.findOne({
            where: {id, userId}
        })

        if (!note) {
            return res.status(404).json({message: 'Note not found'})
        }

        await note.destroy();
        res.status(200).json({message: 'Note deleted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = router;