document.addEventListener('DOMContentLoaded', async () => {
  const empleadosDiv = document.getElementById('empleados');
  
  try {
    // Hacer una solicitud fetch para obtener los datos de la API
    const response = await fetch('/api/empleados');
    
    // Verificar si la respuesta es correcta (status 200)
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }

    // Convertir la respuesta en formato JSON
    const empleados = await response.json();

    // Generar una lista de empleados con las columnas necesarias
    empleadosDiv.innerHTML = '<ul>' + empleados.map(emp => 
      `<li>ID: ${emp.id_empleados}, Nombre: ${emp.nombre}, Apellido: ${emp.apellido}, Edad: ${emp.edad}, Salario: ${emp.salario}</li>`
    ).join('') + '</ul>';
  } catch (error) {
    // Si ocurre un error, mostrar un mensaje en el div
    empleadosDiv.textContent = 'No se pudieron obtener los datos.';
    console.error('Error:', error);
  }
});