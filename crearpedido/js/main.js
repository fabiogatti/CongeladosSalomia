function getFormattedDate(){
	var date = new Date();
	var MM = date.getMonth() + 1; // getMonth() is zero-based
	var dd = date.getDate();
	var hh = date.getHours();
	var mm = date.getMinutes();

	return (dd>9 ? '' : '0') + dd + "-" + (MM>9 ? '' : '0') + MM + "-" + date.getFullYear() + " " + (hh>9 ? '' : '0') + hh + ":" + (mm>9 ? '' : '0') + mm;
			
}

$( document ).ready(function() {

	var date = $('#datepicker').datepicker({ dateFormat: 'dd/mm/yy' }).val();
  	var lastProduct;
  	var lastProductName;

  	//Lista de precios, el orden es el siguiente
  	//Empanada Coctel   	Empanada Pañuelo   	Empanada Media Luna   	Empanada Media Luna Mini   				Empanada Borde Mediano
  	//Dedo de Queso Super   Dedo de Queso Liso  Dedo de Queso Torneado  Dedo Salchicha  	Dedo Hawaiano		Dedo Bocadillo
  	//Pastel de Pollo		Pastel Ranchero		Pastel de Carne			Pastel Hawaiano		Pastel Yuca Carne	Pastel Yuca Carne Mini
  	//Papa Rellena			Papa Rellena Mini 	Hojaldre				Rosquilla
  	var nombreProductos = ["Empanada Coctel","Empanada Pañuelo","Empanada Media Luna","Empanada Media Luna Mini","Empanada Borde Mediano",
  							"Dedo de Queso Super","Dedo de Queso Liso","Dedo de Queso Torneado","Dedo Salchicha","Dedo Hawaiano","Dedo Bocadillo",
  							"Pastel de Pollo","Pastel Ranchero","Pastel de Carne","Pastel Hawaiano","Pastel Yuca Carne","Pastel Yuca Carne Mini",
  							"Papa Rellena","Papa Rellena Mini","Hojaldre","Rosquilla"];
  	var precios = [11000,3200,3200,7000,5550,6500,3000,5500,8000,4000,6000,14000,13000,13000,13000,15000,12000,7500,6000,2300,10000];

  	//Mapa de pedidoList, contiene una llave de contadorPedidos y un valor de un array [idProducto,numPaquetes,subtotal]
 	var pedidoList = new Map();

 	//Id para el numero de pedidos agregados a la lista, siempre incrementa despues de agregarse un nuevo producto
 	var contadorPedidos = 0;

 	//Valor total, suma de los productos*cantidad sin incluir domicilio
 	var total = 0;


    var firebaseConfig = {
	    apiKey: "AIzaSyDARuJw4kPdZypaECAiCD7VMjD4YWbWa4I",
	    authDomain: "salomia-747e3.firebaseapp.com",
	    databaseURL: "https://salomia-747e3.firebaseio.com",
	    projectId: "salomia-747e3",
	    storageBucket: "salomia-747e3.appspot.com",
	    messagingSenderId: "608244773516",
	    appId: "1:608244773516:web:d8a8dbfc19e19b613181a9",
	    measurementId: "G-2HN582V00W"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	/*firebase.database().ref("/").once('value',function(snapshot){
		console.log(snapshot.val());
	});*/


	//Declaración del delay del toast
	$(".toast").toast({
		delay: 2500
	});


	$( function() {
    	$( "#datepicker" ).datepicker( "setDate" , new Date() );
  	} );

  	
 	
 	$('.dropdown-toggle').dropdown()

 	//Función de click del menu dropdown
 	$(".dropdown-menu li a").click(function(){	

 		//Se les asigna a las variables lastProduct (el numero de la posicion del producto) y lastProductName (el nombre de la lista)
 		console.log("Opción seleccionada: "+$(this).parent().index(".option"));
 		lastProduct = $(this).parent().index(".option");
 		lastProductName = $(this).text();
 		console.log($(this).text());

 		//Se asigna el texto al dropdown como seleccionado
    	$(".dropdown-toggle:first-child").text(lastProductName);
    	//$(".dropdown-toggle:first-child").val(lastProductName);

    	//Se evalua si la cantidad es invalida (nula o es <0) para cambiar el valor del subtotal
    	if($(".quantity").val()=="" || parseInt($(".quantity").val())<0){
			$(".subTotal").text("0");
		}
		else{
			console.log("Precio del paquete: "+precios[lastProduct]);
			console.log("Cantidad de paquetes: "+parseInt($(".quantity").val()));
			$(".subTotal").text(precios[lastProduct]*parseInt($(".quantity").val()));
		}
	});


 	//Función para detectar cuando se escribió algo dentro del input quantity para actualizar el valor del subtotal
	$(".quantity").keyup(function(){
		if(lastProduct==null || $(".quantity").val()=="" || parseInt($(".quantity").val())<0){
			$(".subTotal").text("0");
		}
		else{
			console.log("Precio del paquete: "+precios[lastProduct]);
			console.log("Cantidad de paquetes: "+parseInt($(".quantity").val()));
			$(".subTotal").text(precios[lastProduct]*parseInt($(".quantity").val()));
		}
	});



	//Funcion para cuando le da click al botton add, añade un pedido al mapa pedidoList y añade a la lista de html componentes dentro de un div
 	$(".add").click(function(){

 		//Verificación si se seleccionó un producto (Si lastproduct es null no se ha seleccionado nada)
 		if(lastProduct==null){
 			alert("Favor seleccionar un producto para agregar");
 			return;
 		}
 		//Verificación si se la cantidad es menor que uno o tiene un valor nulo o vacio
 		if(parseInt($(".quantity").val())<1 || $(".quantity").val()=="" || $(".quantity").val()==null){
 			alert("Favor agregar una cantidad de paquetes válida");
 			return;
 		}
 		for (var i = 0; i < pedidoList.size ; i++) {
 			if(pedidoList.get(i)[0]==lastProduct){
 				alert("No se puede tener el mismo producto duplicado");
 				return;
 			}
 		}

 		//Suma a la variable total el valor del producto actual
 		total += parseInt($(".subTotal").text());
 		$(".total").text(total);

 		//Añade al mapa de pedidoList una llave de contadorPedidos y un valor de un array [idProducto,numPaquetes,subtotal]
 		pedidoList.set(contadorPedidos,[lastProduct,parseInt($(".quantity").val()),parseInt($(".subTotal").text())]);
 		console.log(pedidoList);


 		//Añade al div productList el html del producto agregado
 		$(".productList").append("<div class='listItem item flexRow list pedido"+contadorPedidos+"'><p class='space firstItem'>"+lastProductName+"</p><p class='space'>"+$(".quantity").val()+"</p><p class='space lastItem'>"+$(".subTotal").text()+"</p><button class='remove'><i class='fas fa-minus'></i></button></div>");

 		$(".toast").css("z-index",2);
		$(".toast").toast("show");

 		contadorPedidos += 1;
 	});


 	//Función para remover un producto cuando se da click al botón de remove creado programaticamente
 	$(".productList").on("click","button.remove",function(){
 		
 		// Extrae la clase asignada programaticamente en la funcion de .add
 		// (la variable de contadorPedidos que tiene asignado el valor 'pedido#' y extrae el #)
 		var idPedido = $(this).parent().attr("class").split(" ");
 		idPedido = idPedido[idPedido.length-1];
 		idPedido = parseInt(idPedido.replace("pedido",""));
 		console.log(idPedido);
 		
 		//Se toma el subtotal del producto de la variable pedidoList, se le elimina y se le resta del total
 		console.log("La descripcion del producto eliminado: "+pedidoList.get(idPedido));
 		total -= pedidoList.get(idPedido)[2];
 		$(".total").text(total);
 		pedidoList.delete(idPedido);
 		console.log(pedidoList);

 		//Remueve el codigo html del div del padre del botton con clase remove
 		$(this).parent().remove();
 	});



 	$(".submit").click(function(){
 		//Checkea si todos los campos contienen información
 		if($("#datepicker").val()=="" || $("#clientName").val()=="" || $("#clientPhone").val()==""
 		|| $("#clientAddress").val()=="" || $("#deliveryCost").val()=="" || $("#ammountPayed").val()==""){
 			alert("Favor llenar todos los campos con la información del cliente");
 			return;
 		}
 		//Checkea si la lista de pedidos esta vacía
 		else if(pedidoList.size == 0){
 			alert("Favor ingresar productos a la lista");
 			return;
 		}
 		//Si todo esto ocurre, entonces manda el pedido a firebase
 		else{


 			var temp = {};
 			/*for(i==0;i<pedidoList.size(),i++){
 				var productId = pedidoList.get(i)[0];
 				temp[productId] = 
 				{
 					nombre:nombreProductos[productId],
 					cantidad:pedidoList.get(i),
 					subtotal:"",
 				}
 			}*/

 			for (let [k, v] of pedidoList) {
				console.log(k, v);
				temp[v[0]] = 
 				{
 					nombre:nombreProductos[v[0]],
 					cantidad:v[1],
 					subtotal:v[2],
 				}
			}

 			console.log(temp);

 			//var x = JSON.stringify(temp);

 			/*var temp2 = {
 				nombre:"",
 				teléfono:"",
 				dirección:"",
 				hora:"",
 				check:"",
 				totalNoDomicilio:"",
 				domicilio:"",
 				abonado:"",
 				productos:temp
 			};

 			console.log(temp2);*/

 			firebase.database().ref("pedidos/"+$("#datepicker").val().replace(/\//g,'-')).push({
 				nombre:$("#clientName").val(),
 				teléfono:parseInt($("#clientPhone").val()),
 				dirección:$("#clientAddress").val(),
 				fechaCreado:getFormattedDate(),
 				check:"false",
 				totalNoDomicilio:parseInt($(".total").text()),
 				domicilio:parseInt($("#deliveryCost").val()),
 				abonado:parseInt($("#ammountPayed").val()),
 				productos:temp
 			},function(error){
 				if(error){
 					console.log(error);
 					alert("Algo salió mal, favor consultar con el creador");
 					return;
 				}
 				else{
 					alert("Pedido creado de manera exitosa!");
 					location.reload();
 				}
 			});
 		}

 	});


});