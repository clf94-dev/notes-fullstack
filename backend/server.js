// backend/server.js (ESM)
import './env.js';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS typeof:', typeof process.env.DB_PASS, 
            process.env.DB_PASS ? `(len ${process.env.DB_PASS.length})` : '(missing)');
import express, { Router } from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import notesRoutes from './routes/notes.js';
import tagsRoutes from './routes/tags.js';

import authMiddleware from './middleware/auth.js';


const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow comma-separated origins in CORS_ORIGINS, or allow all in dev)
const allowed = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
app.use(cors({ origin: allowed.length ? allowed : true }));

// Health check
app.get('/', (_req, res) => res.send('Backend is working 🚀'));

// Public auth routes
app.use('/auth', authRoutes);

// Protected API group
const api = Router();
api.use('/user', usersRoutes);
api.use('/notes', notesRoutes);
api.use('/tags', tagsRoutes);

app.use('/api', authMiddleware, api);

// Start server (0.0.0.0 is docker-friendly)
const PORT = Number(process.env.PORT ?? 5050);
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  const shownHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
  console.log(`Server running on http://${shownHost}:${PORT}`);
});
