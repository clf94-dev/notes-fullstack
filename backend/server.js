require('dotenv').config({path: `.env.${process.env.NODE_ENV || 'development'}`});
const express = require('express');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes');
const tagsRoutes = require('./routes/tags');
const usersRoutes = require('./routes/users');


const app = express();
app.use(express.json())

const allowed = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({origin: allowed.length ? allowed : true}));
app.use(express.urlencoded({ extended: true }));


app.use('/auth',authRoutes)


const api = require('express').Router();
api.use('/user', usersRoutes);
api.use('/notes', notesRoutes);
api.use('/tags', tagsRoutes);
app.use('/api',authMiddleware, api);




const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
