$(document).ready(function(){
  $('.parallax').parallax();


  $('.slider').slider({
  	height:600,
  	indicators:true,
  	interval:6000
  });

  autoplay()   
	function autoplay() {
    	$('.carousel').carousel('next');
    	setTimeout(autoplay, 6000);
	}

  //window.setInterval(function(){$('.slider').slider('next')},6000);

  $('.slider').css("height",600); //Funcion para remover el espacio que crea el materialize para los indicators

  $('.carousel.carousel-slider').carousel({fullWidth: true,verticalSwiping:true});

  //Hacer resize del carousel
  if(($(window).width()*0.55)<350){
  	$('.carousel.carousel-slider').css("height",350); //55
  	$(".indicators").css("top",300);
  }
  else{
  	$('.carousel.carousel-slider').css("height",$(window).width()*0.55); //55
  	$(".indicators").css("top",$(window).width()*0.455);
  }
  /*$('.carousel.carousel-slider').css("height",$(window).width()*0.55); //55
  $(".indicators").css("top",$(window).width()*0.455);*/

  $( window ).resize(function(event) {
	  if(($(window).width()*0.55)<350){
	  	$('.carousel.carousel-slider').css("height",350); //55
	  	$(".indicators").css("top",300);
	  }
	  else{
	  	$('.carousel.carousel-slider').css("height",$(window).width()*0.55); //55
	  	$(".indicators").css("top",$(window).width()*0.455);
	  }


	  setTimeout(function(){
        $(".small-item").width($(".small-item").parent().width());
        $(".medium-item").width($(".medium-item").parent().width());
      }, 100);
	  /*$('.carousel.carousel-slider').css("height",$(window).width()*0.55); //55
	  $(".indicators").css("top",$(window).width()*0.455);*/
  });


  $("#btn-left").click(function(event) {
  	$('.slider').slider('prev');
  	// Para darle un tiempo de delay despues de que cambio de imagen
  	$('.slider').slider('pause');
  	setTimeout(function(){
    	$('.slider').slider('start');
		}, 50);
  });


  $("#btn-right").click(function(event) {
  	$('.slider').slider('next');
  	$('.slider').slider('pause');
  	// Para darle un tiempo de delay despues de que cambio de imagen
  	setTimeout(function(){
    	$('.slider').slider('start');
		}, 50);
  });

  

  $('.small-slider').slick({
	  centerMode: true,
	  centerPadding: '15px',
	  slidesToShow: 1,
	  autoplay: true,
	  autoplaySpeed: 6000,
	  prevArrow: false,
	  nextArrow: false,
	  /*responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
	  ]*/
  });

  $('.medium-slider').slick({
	  centerMode: true,
	  centerPadding: '30px',
	  slidesToShow: 1,
	  autoplay: true,
	  autoplaySpeed: 6000,
	  prevArrow: false,
	  nextArrow: false,
  });

  $(".small-item").width($(".small-item").parent().width());
  $(".medium-item").width($(".medium-item").parent().width());

});
