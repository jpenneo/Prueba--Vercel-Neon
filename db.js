const { Pool } = require('pg');

// Configuración de conexión a Neon usando variables de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Requerido para Neon
  },
});

module.exports = pool;
