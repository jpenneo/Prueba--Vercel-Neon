const express = require('express');
const cors = require('cors');
const pool = require('./db');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener datos de la tabla "empleados"
app.get('/api/empleados', async (req, res) => {
  try {
    console.log('Conectando a la base de datos...'); 
    const result = await pool.query('SELECT * FROM empleados');
    console.log('Datos obtenidos:', result.rows);
    res.json(result.rows); // Responde con los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


