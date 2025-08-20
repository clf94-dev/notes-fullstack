require('dotenv').config({path: `.env.${process.env.NODE_ENV || 'development'}`});
const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json())

const allowed = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({origin: allowed.length ? allowed : true}));

app.get('/', (_req, res) => res.send('Backend is running!'));


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
