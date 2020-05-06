$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('ul.tabs').tabs();

  //INDEX2.HTML
  $('.slider').slider({
    height: 300,
    indicators: false,
    interval:6000
    });

  function resizeText(number,h=0){
    let current_tab = $('.tab'+number+'-item');
    for (var j = current_tab.length - 1; j >= 0; j--) {
      if($(current_tab[j]).height()>h){
        h=$(current_tab[j]).height();
        console.log(h);
      }
      console.log($(current_tab[j]).height()+":"+j+":"+h+":"+number);
    }
    for (var j = current_tab.length - 1; j >= 0; j--) {
      $(current_tab[j]).height(h);
    }
  }

  /*let active_tab = 0;
  resizeText(active_tab);

  $(window).resize(function() {
    resizeText(active_tab);
  });*/


  $(".tab").click(function(event) {
  	let tab_number = $(".tab").index(this);
  	let next_tab = 'tab'+tab_number;
  	//$("."+next_tab).css("opacity:0");
  	//console.log(a);
    /*setTimeout(function(){
        resizeText(tab_number);
    }, 550);*/

  	$(".show").animate({
	    opacity: 0.0
	    /*,
	    width: "toggle"*/
		}, 500, function() {
	    	$(".show").addClass('hide').removeClass('show');
  			$("."+next_tab).addClass('show').removeClass('hide');
  			$("."+next_tab).animate({
  				opacity: 1.0
  			},750, function() {
          active_tab = tab_number;
          //resizeText(active_tab);
  				/* stuff to do after animation is complete */
  			});
		});
  });
});