var app = angular.module('tienda_virtual', []);
var url_server = 'localhost:3000';
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
app.controller('tienda_ordenar', function($scope, $http){
	$scope.cantidad_kilos = 1;
	$scope.actualizar_kilos = function() {
		$("#error_actualizar").empty()
		var datos = {
			cantidad : $scope.cantidad_kilos
		}
		$http.put("/actualizar_kilos", datos).success(function(response) {
            if(response.status == "OK") {
                $("#error_actualizar").append('<h4>Información actualizada.</h4>')
                $("#cantidad_encargada").html("Cantidad a comprar "+response.cantidad_numero+" Kg<br>Total $"+response.total)
            }else{
            	$("#error_actualizar").append('<h4>Ocurrio un error al actualizar la información.</h4>')
            }
        })
	}
});