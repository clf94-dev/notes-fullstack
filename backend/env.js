// backend/env.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load the .env file that sits next to this file (backend/.env.*)
const envName = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `.env.${envName}`);

dotenv.config({ path: envPath });

// Optional: quick debug once
if (process.env.DEBUG_ENV === '1') {
  // mask password when logging
  const pass = process.env.DB_PASS ? `len ${process.env.DB_PASS.length}` : 'missing';
  console.log(`[env] loaded ${envPath}`);
  console.log(`[env] DB_HOST=${process.env.DB_HOST} DB_USER=${process.env.DB_USER} DB_PASS=${pass}`);
}
