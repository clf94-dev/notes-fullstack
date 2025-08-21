const express = require('express');
const router = express.Router();
const { User, Notes, Tags } = require('../models');

router.get('/notes', async (req, res) => {
    const userId = req.user.id;
    try {
        const notes = await Notes.findAll({
            where: {userId},
            include: [{
                model: Tags,
                as: 'tags',
                attributes: ['id', 'name']
            }]
        })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/note', async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    try {
        const note = await Notes.create({
            title, 
            content, 
            tags, 
            userId
        })
        if (tags && tags.length > 0) {
            const tagInstances = await Tags.findAll({
                where: { id: tags }
            });
            await note.setTags(tagInstances);
        }
        res.status(201).json({message: 'Note created successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.put('/note/:id', async (req, res)=> {
    const { id } = req.params;
    const { title, content, tags} = req.body;
    const userId = req.user.id;

    try {
        const note =  await Notes.findOne({
            where: {id, userId}
        })

        if (!note) {
            return res.status(404).json({message: 'Note not found'})
        }

        note.title = title;
        note.content = content;
        if (tags && tags.length > 0) {
            const tagInstances = await Tags.findAll({
                where: {id: tags}
            })
            await note.setTags(tagInstances)
        }
        await note.save();

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.delete('/note/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Notes.findOne({
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