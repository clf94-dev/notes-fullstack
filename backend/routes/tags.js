
import express from 'express';
import db from '../models/index.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.user.userId;
    try {
        const tags = await db.Tag.findAll({
            where: {userId},
            attributes: ['id', 'name']
        });
        res.status(200).json(tags);
    } catch (error) {
        console.error({error})
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/', async (req, res) => {
    const { name } = req.body;
    const userId = req.user.userId;

    try {

        const existingTag = await db.Tag.findOne({
            where: {name, userId}
        }) 

        if(!name || name.trim() === ''){
            return res.status(400).json({message: 'Tag name is required'})
        }
        if (existingTag) {
            return res.status(400).json({message: 'Tag already exists'})
        }

        const tag = await db.Tag.create({
            name, 
            userId,
        })
       
        res.status(201).json(tag.id)
    } catch (error) {
        console.error({error})
        res.status(500).json({message: 'Internal server error'})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const tag = await db.Tag.findOne({
            where: {id, userId}
        })

        if(!tag){
            return res.status(404).json({message: 'Tag not found'})
        }

        await tag.destroy()
        res.status(200).json({message:'Tag deleted successfully'})
    } catch (error) {
        console.error({error})
        res.status(500).json({message: 'Internal server error'})
    }
})

export default router;