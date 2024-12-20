const { Pool } = require('pg');
require('dotenv').config(); // Cargar las variables de entorno desde .env en desarrollo

// Verificar que las variables de entorno estén definidas correctamente
const requiredVars = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_DATABASE'];
const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`Error: Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Determinar si estamos en producción (Vercel) o en desarrollo (local)
const isProduction = process.env.NODE_ENV === 'production';

// Configuración del pool de conexiones de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false } // SSL solo para producción
});

// Probar la conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos establecida.');
  }
});

module.exports = pool;

