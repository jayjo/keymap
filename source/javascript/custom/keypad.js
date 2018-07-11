jQuery(document).ready(function($) {
  
  $(".expand").on('click', function(e){
    $(this).addClass('inactive');
    $('.minimize').removeClass('inactive');
    $('.keypad').draggable();
    $('.keypad').addClass('undocked');
  });

  $(".minimize").on('click', function(e){
    $(this).addClass('inactive');
    $('.expand').removeClass('inactive');
    $('.keypad').draggable('destroy');
    $('.keypad').removeClass('undocked').attr('style', '')
    $('.keypad').removeClass('undocked');
  });
});