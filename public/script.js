fetch('/api/empleados')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const empleadosList = document.getElementById('empleados');
    data.forEach((empleado) => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID_EMPLEADO: ${empleado.id_empleado}, NOMBRE: ${empleado.nombre}, Apellido: ${empleado.apellido}, EDAD: ${empleado.edad},SALARIO: ${empleado.salario}`;
      empleadosList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });