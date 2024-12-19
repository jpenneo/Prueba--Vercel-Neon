const { Pool } = require('pg');
require('dotenv').config();  // Cargar las variables de entorno desde .env en desarrollo

// Verificar que las variables de entorno estén definidas correctamente
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_DATABASE) {
  console.error('Error: Faltan algunas variables de entorno');
  process.exit(1); // Detiene la ejecución si falta alguna variable
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
  ssl: { rejectUnauthorized: false }  // Asegura que SSL esté habilitado
});
// Probar la conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida.');
  }
});

module.exports = pool;
