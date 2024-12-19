import pool from '../db'; // Asegúrate de que pool esté correctamente exportado de db.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM empleados');
      res.status(200).json(result.rows); // Responde con los datos en formato JSON
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' }); // En caso de que la petición no sea GET
  }
}