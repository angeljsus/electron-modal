/* Función que manda llamar los modales registrados en el archivo de la aplicación Electron (app.js) */
function createModal(width, height, name){
	const config = `{"width":${width}, "height": ${height}}`;
	const modalWindow = window.open(`about:blank`, name, config);
}