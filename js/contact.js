$(document).ready(function(){
  $(".button-collapse").sideNav();

  Materialize.updateTextFields();
  $('#Mensaje').val('');
  $('#Mensaje').trigger('autoresize');

  let height = $(".pager").parent().height();
  let nheight = height-2;
  $(".pager").css("max-height",nheight);
  $( window ).resize(function() {
    let height = $(".pager").parent().height();
    let nheight = height-2;
    $(".pager").css("max-height",nheight);
  });

  //Funcion para detectar que un email completo esta incorrecto al hacer un cambio en el input de email (no sirve)
  /*$("#email").change(function(event) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    alert("cambio");
    console.log(!regex.test($("#email").val()));
    if(!regex.test($("#email").val())){
      $("#email").addClass('invalid');
      $("#email").removeClass('valid');
    }
    else{
      $("#email").removeClass('invalid');
      $("#email").addClass('valid');
    }
  });*/

  $(".validate").click(function(event) {
    $(this).removeClass('invalid');
  });

  $("#enviar").click(function(event) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    /*console.log(regex.test($("#email").val()));*/
    let name = $("#nombre").val();
    let subject = $("#asunto").val();
    let email = $("#email").val();
    let msg = $("#mensaje").val();
    if(name=="" || subject=="" || email=="" || !regex.test($("#email").val()) || msg==""){
      //console.log($(".validate")[0].attr("id"));
      let input = $(".validate");

      for (var i = input.length - 1; i >= 0; i--) {
        if($(input[i]).val()==""){
          $(input[i]).addClass('invalid');
        }
        if(i==2 && !regex.test($("#email").val())){
          console.log(regex.test($(input[i]).val()));
          $(input[i]).addClass('invalid');
        }
      }
    }
    else{
      $.post("../php/contact.php", {
        name: name,
        email: email,
        message: msg,
        subject: subject
        }, function(data) {
          /*$("#returnmessage").append(data);*/ // Append returned message to message paragraph.
          if (data == "Success") {
            Materialize.toast('Su mensaje ha sido enviado', 3000, 'rounded', 'center');
            let input = $(".validate");
            for (var i = input.length - 1; i >= 0; i--) {
              $(input[i]).val("");
              $(input[i]).removeClass('valid');
            }
            console.log("Enviado");
          }
          else{
            Materialize.toast('Algo salió mal, por favor intente mas tarde', 3000, 'rounded', 'center');
            console.log("Error");
          }
        });
    }
  });


});