function addAccordion(obj){

	var htmlString = "<div class='accordionContent'>";
	var i = 0;

	var checkedArray = [];

	var arrayStrings = ["Nombre","Teléfono","Dirección","Fecha Creación","Domicilio","Monto Abonado","Total sin Domicilio"];
	var arrayKeys = ["nombre","teléfono","dirección","fechaCreado","domicilio","abonado","totalNoDomicilio"];

	//for (var i = 0; i < obj.val().length ; i++) {
	for (let Key of Object.keys(obj.val())) {
		htmlString += '<div class="card ';
		htmlString += Key+'"><div class="card-header row" id="';
		htmlString += 'heading'+i+'">';
		htmlString += '<h2 class="col-11"><button class="btn btn-block text-left headerText" type="button" data-toggle="collapse" aria-expanded="true" data-target="'
		htmlString += '#collapse'+i+'">';
		htmlString += obj.val()[Key]["nombre"] + " - " + obj.val()[Key]["fechaCreado"].replace(/\-/g,'/');
		htmlString += '</button></h2><input type="checkbox" class="check col-1';
		if(obj.val()[Key]["check"]=="true" || obj.val()[Key]["nombre"] == true){
			htmlString += ' disabled" checked disabled ';
		}
		else{
			htmlString += '" ';
		}
		htmlString += 'id="checkBox'+i+'">'
		htmlString += '</div><div class="collapse show" aria-labelledby="'
		htmlString += 'heading'+i+'" data-parent="#accordion" id="';
		htmlString += 'collapse'+i+'">';

		htmlString += '<div class="card-body">'
		console.log(htmlString);

		for (var j = 0; j < arrayKeys.length ; j++) {
			htmlString += '<div class="flexRow"><p class="bold">'+arrayStrings[j]+'</p><p>'+obj.val()[Key][arrayKeys[j]]+'</p></div>';
			//console.log(htmlString);
		}
		console.log(htmlString);
		htmlString += '<div class="item flexRow bold"><p>Producto</p><p>Cantidad</p><p>Subtotal</p></div>';

		console.log(obj.val()[Key]);
		console.log(obj.val()[Key]["productos"]);
		var products = obj.val()[Key]["productos"];
		for (let productKey of Object.keys(products)) {
			htmlString += '<div class="flexRow"><p>'+products[productKey]["nombre"]+'</p><p>'+products[productKey]["cantidad"]+'</p><p>'+products[productKey]["subtotal"]+'</p></div>';
			//console.log('<div class="flexRow"><p>'+products[productKey]["nombre"]+'</p><p>'+products[productKey]["cantidad"]+'</p><p>'+products[productKey]["subtotal"]+'</p></div>');
		}
		htmlString += '</div></div></div>';
		
		checkedArray.push(obj.val()[Key]["check"]);
		i++;
	}


	htmlString += '</div>';

	console.log(htmlString);

	$("#accordion").append(htmlString);

	return checkedArray;
}


$( document ).ready(function() {

	var date = $('#datepicker').datepicker({ dateFormat: 'dd/mm/yy' }).val();
	var checkedArray = [];

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


	//Función para poner el datepicker en la fecha actual y poner la fecha correspondiente en el input de date
    $( "#datepicker" ).datepicker( "setDate" , new Date() );
    $(".dateInput").val($("#datepicker").val());


	//Función para poner poner la fecha correspondiente en el input de date cada vez que se cambie la fecha en el selector #datepicker
	$(document).on('change', '#datepicker',function(){
 		console.log("clicked");
 		$(".dateInput").val($("#datepicker").val());
 	});


	//Función para ocultar/mostrar el div de la fecha
	$(".dateBtn").click(function(event){
		$(".rotate").toggleClass("down"); 
		event.preventDefault();
		$(".dateDiv").slideToggle('fast');
	});

	//Declaración del delay del toast
	$(".toast").toast({
		delay: 2500
	})


	//Functión para habilitar o deshabilitar el botón de guardar cambios (.submit)
	$(document).on('change', '.check',function(){
		//Se hace un for para iterar sobre toda la lista de arrays de check extraida en la función addAccordion
		for (var i = 0; i < checkedArray.length ; i++) {
			//Se verifica si el contenido inicial de los pedidos tenia algun checked falso y se ha modificado alguno a verdadero en pantalla
			//De ser asi, existe un cambio entre los valores previos y se habilita el botón de guardar cambios (.submit)
			if(checkedArray[i]=='false' && $("#checkBox"+i).prop('checked')==true){
				$(".submit").prop('disabled', false);
				return;
			}
		}
		//Si no se ha encontrado cambio, el botón permanece deshabilitado (ya que no hay cambios para guardar)
		$(".submit").prop('disabled', true);

	});


	//Función para hacer toggle (mostrar y ocultar) las  información del pedido (.card) agregadas 
	//programaticamente que ya estén chequeadas (que tengan clase disabled)
	$(document).on('change', '.filter',function(){
		$(".check.disabled").closest(".card").toggle();
	});



	$(".submit").click(function(){
		for (var i = 0; i < checkedArray.length ; i++) {
			//Se verifica si el contenido inicial de los pedidos tenia algun checked falso y se ha modificado alguno a verdadero en pantalla
			//De ser asi, existe un cambio entre los valores previos y se habilita el botón de guardar cambios (.submit)
			if(checkedArray[i]=='false' && $("#checkBox"+i).prop('checked')==true){
				var classes = $("#checkBox"+i).closest(".card").attr("class").split(" ");
				var key = classes[classes.length-1];
				var ref = "pedidos/"+$("#datepicker").val().replace(/\//g,'-')+'/'+key;
				console.log(ref);
				firebase.database().ref(ref).update({
				    check: "true"
				});
			}
		}
		$(".modal2").modal("show");

		$(".accordionContent").remove();
		$(".submit").prop('disabled', true);
		$(".filterDiv").prop('hidden',true);
	})


	//Función para traer los pedidos con la fecha especificada
	//Va a firebase y trae los elementos con la fecha indicada, elimina los anteriores (el div .accordionContent)
	//Si no encuentra elementos, muestra un modal para cambiar la fecha
	//Si encuentra elementos, muestra los valores usando la function (addAccordion), la cual retorna un array de checks para verificación
	$(".bring").click(function(){
		firebase.database().ref("pedidos/"+$("#datepicker").val().replace(/\//g,'-')).once('value').then(function(snapshot) {
			console.log(snapshot.val());

			//Remueve el anterior contenido de pedidos (lo que esta dentro del #accordion osea el .accordionContent)
			$(".accordionContent").remove();

			//Si no encuentra datos o no estan definidos, muestra un modal, oculta el filtro y deshabilita el botón de Guardar Cambios (.submit)
			if(snapshot.val()==null || snapshot.val()==undefined){
				$(".modal1").modal("show");
				$(".submit").prop('disabled', true);
				$(".filterDiv").prop('hidden',true);
			}
			//Si encuentra datos los muestra usando un toast, ademas los agrega a la pantalla usando la function addAcordeon
			//y muestra el div del filtro, además guarda los valores "check" de los pedidos que trae en un array (checkedArray)
			else{
				$(".toast").css("z-index",2);
				$(".toast").toast("show");
				checkedArray = addAccordion(snapshot);
				$(".filterDiv").prop('hidden',false);
				console.log(checkedArray);
			}
		});


		//$(".modal").modal("show");
		
		//$(".toast").toast("show");
	});

});