// Conexión a BD
var mongoose = require('mongoose');
/*
 * GET home page.
 */

exports.index = function(req, res){
	req.session.destroy()
	res.render('index', {
		title : '¡Salchicha Ejuteca!',
		inicio : 'active'
	})
};
/* Desplegamos la pantalla para ordenar */
exports.ordenar = function(req, res){
	req.session.destroy()
	res.render('ordenar', {
		title : 'Pida su deliciosa salchicha',
		ordenar : 'active'
	})
};
// Desplegamos la pagina donde pediremos la informacion de la compra
exports.cantidad = function(req, res){
	var cantidad = req.params.cantidad;
	// Pediremos los datos del usuario
	if (cantidad == 'cuarto') {
		if(!req.session.compra)
			req.session.compra = {};
		req.session.compra.cantidad = 'cuarto';
		req.session.compra.total = 65;
		res.render('compra', {
			title : 'Datos de compra',
			ordenar : 'active',
			compra : req.session.compra
		})
	}else if (cantidad == 'medio') {
		if(!req.session.compra)
			req.session.compra = {};
		req.session.compra.cantidad = 'medio';
		req.session.compra.total = 130;
		res.render('compra', {
			title : 'Datos de compra',
			ordenar : 'active',
			compra : req.session.compra
		})
	}else if (cantidad == 'entero') {
		if(!req.session.compra)
			req.session.compra = {};
		req.session.compra.cantidad = 'entero';
		req.session.compra.total = 260;
		if (req.session.compra.cantidad_numero <= 1 || req.session.compra.cantidad_numero == undefined) {
			req.session.compra.cantidad_numero = 1;
		}else{
			req.session.compra.total = (260 * req.session.compra.cantidad_numero);
		}	
		res.render('compra', {
			title : 'Datos de compra',
			ordenar : 'active',
			compra : req.session.compra
		})
	}else {
		res.render('ordenar', {
			title : 'Pida su deliciosa salchicha',
			ordenar : 'active',
			error : "Selecciona la cantidad a comprar."
		})
	}
}
// Actualizamos la cantidad de kilos a comprar
exports.actualizar_kilos = function(req, res){
	if (!req.session.compra) {
		res.json({
			status : 'FAIL'
		})
	}else{
		req.session.compra.cantidad_numero = req.body.cantidad;
		req.session.compra.total = (260 * req.session.compra.cantidad_numero);
		res.json({
			status : 'OK',
			cantidad_numero : req.session.compra.cantidad_numero,
			total : req.session.compra.total
		})
	}
}
// Añadimos información del usuario
exports.datos_comprador = function(req, res){
	if (!req.session.compra) {
		res.render('ordenar', {
			title : 'Pida su deliciosa salchicha',
			ordenar : 'active'
		})
	}else{
		req.session.compra.comprador = req.body;
		res.redirect('/forma_de_envio')
	}
}
// Mostramos la información de la compra
exports.terminar_compra = function(req, res){
	if (!req.session.compra) {
		res.render('ordenar', {
			title : 'Pida su deliciosa salchicha',
			ordenar : 'active'
		})
	}else{
		res.render('compra_finalizada', {
			title : '¡Compra terminada!',
			ordenar : 'active',
			compra : req.session.compra
		})
	}
}
// Función general para renderizar vistas despues de un post
exports.render = function(req, res){
	// Tenemos un usuario que esta ejecutando una compra
	if (req.session.compra) {
		// La compra se encuentra en el estado de pedir datos del envio
		if (req.session.compra.comprador) {
			res.render('envio', {
				title : 'Forma de envio',
				ordenar : 'active',
				compra : req.session.compra
			})
		};
	}else {
		res.render('ordenar', {
			title : 'Pida su deliciosa salchicha',
			ordenar : 'active'
		})
	}
}
exports.contacto = function(req, res){
	res.render('contacto', {
		title : '¡SERGIT!',
		contacto : 'active'
	})
}