
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , session = require('express-session')
  , mongoose = require('mongoose')
  , path = require('path')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

var app = express();

//var procesamiento = require('./routes/procesamiento.js')

// Conectamos a base de datos 
/*mongoose.connect('mongodb://localhost/tienda', function(err){
  if (err) {
    console.log("Error de conexion",err);
  }else{
    console.log("Conexion exitosa");
  }
});*/

// Configuration

app.set('port', (process.env.PORT || 5000));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' ,keys: ['key1', 'key2']}));
    app.use(bodyParser.json());                          // parse application/json
    app.use(bodyParser.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded
    app.locals.username = null;
/*
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});*/

// Routes

app.get('/', routes.index);
app.get('/forma_de_envio', routes.render)
app.get('/ordenar', routes.ordenar)
app.get('/ordenar/:cantidad', routes.cantidad)
app.put('/actualizar_kilos', routes.actualizar_kilos)
app.post('/datos_comprador', routes.datos_comprador)
app.get('/terminar_compra', routes.terminar_compra)
app.get('/contacto', routes.contacto)

/*app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});*/
//var server = http.createServer(app);
//var port = process.env.PORT || 5000;
app.listen(app.get('port'), function () {
  console.log('Servidor inicializado en %d', port);
});
