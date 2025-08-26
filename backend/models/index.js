import '../env.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SEQ_LOG === 'true' ? console.log : false,
  }
);

const db = {};
const files = fs.readdirSync(__dirname).filter(f =>
  f !== 'index.js' && f.endsWith('.js')
);

// dynamically import each model file
for (const file of files) {
  const modulePath = path.join(__dirname, file);
  const { default: defineModel } = await import(pathToFileURL(modulePath).href)
    .catch(async () => ({ default: (await import(`file://${modulePath}`)).default })); // fallback for some node versions
  const model = defineModel(sequelize, DataTypes);
  db[model.name] = model;
}

// set up associations
Object.values(db).forEach(m => {
  if (typeof m.associate === 'function') m.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
