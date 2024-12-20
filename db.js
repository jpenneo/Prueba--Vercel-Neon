const { Pool } = require('pg');
require('dotenv').config(); // Cargar las variables de entorno desde .env en desarrollo

// Verificar que las variables de entorno estén definidas correctamente
const requiredVars = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGPORT', 'PGDATABASE'];
const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(`Error: Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Determinar si estamos en producción (Vercel) o en desarrollo (local)
const isProduction = process.env.NODE_ENV === 'production';

// Configuración del pool de conexiones de PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
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

