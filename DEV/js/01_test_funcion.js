document.addEventListener('DOMContentLoaded', initialize);

function initialize(){
	console.log('Running Start!');
	
	const opnModalUno = document.getElementById('opnModalUno');
	const opnModalDos = document.getElementById('opnModalDos');
	const opnModalFke = document.getElementById('opnModalFke');

	opnModalUno.addEventListener('click', function(){
		createModal(250, 400, 'modal_uno');
	})

	opnModalDos.addEventListener('click', function(){
		createModal(500, 400, 'modal_dos');
	})

	opnModalFke.addEventListener('click', function(){
		createModal(500, 400, 'fakeModal');
	})
	
}
