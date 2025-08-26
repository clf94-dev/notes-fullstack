 import { Router } from 'express';
import notes from './notes.js';
import tags from './tags.js';
import users from './users.js';  // if you have it
const api = Router();

api.use('/notes', notes);
api.use('/tags', tags);
api.use('/users', users);

export default api;