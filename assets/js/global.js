jQuery(document).ready(function($) {

	$.loadingStuff = function(){

		setTimeout(function(){
			$('aside').animate({opacity: 1});
		}, 75);

		setTimeout(function(){
			$('#keyboard').addClass('showing');
		}, 550);

	};

	$.loadingStuff();

	$.bodyLoad = function(){

		$(document).ready(function(){

			if ($('aside').hasClass('inactive')) {
				$('.wrapper').removeClass('active');
				$('.settings').removeClass('close');
			}
			else if (!$('aside').hasClass('inactive')) {
				$('.wrapper').addClass('active');
				$('.settings').addClass('close');
			}

		});

	};

	$.keyBoard = function(){

		$('menu a').on('click', function(e){

			var keyClass = $(this).attr('id');

			$('#keyboard').removeClass().addClass(keyClass).addClass('showing');
			$('#codebox').removeClass().addClass(keyClass);
			$(this).addClass('active').siblings().removeClass();

		});

		return false;

	};

	$.keyBoard();

	$.keyCodeKeyboardCodes = function() {

		$.Press = function() {

			$('key').on('mousedown', function(e){

				$('#codebox').addClass('active');

				var dataKey = $(this).attr('data-key');
				var dataLMTH = $(this).attr('data-lmth');
				var dataUni = $(this).attr('data-uni');
				var press = e.which;

				$('#codebox input').addClass('active');

				if ($('#keyboard').hasClass('charcode')) {

					$('#codebox input').val(dataKey);

				} else if ($('#keyboard').hasClass('unicode')) {

					$('#codebox input').val(dataUni);

				} else if ($('#keyboard').hasClass('entities')) {

					$('#codebox input').val(dataLMTH);

				}	else if ($('#keyboard').hasClass('ascii')) {

					$('#codebox input').val(dataLMTH);

				}

				$(this).addClass('active');

			});

		};

		$.Depress = function() {

			$('key').on('mouseup', function(e){

				$('#codebox').removeClass('active');

				var depress = e.which;

				$('#codebox input').removeClass('active');
				$(this).removeClass('active');

			});

		};

		// $.ClipBoard = function() {

		// 	var dataKey = $(this).attr('data-key');

		// 	$('key').on('click', function(){
		// 		$(this).zclip({
		// 			path: 'assets/js/ZeroClipboard.swf',
		// 			copy: dataKey
		// 		});
		// 	});

		// };

		$.Press();
		$.Depress();
		// $.ClipBoard();

	};

	$.keyCodeKeyboardCodes();

	$.keyCombos = function(){

		$('.reload').on('click', function(){
			location.reload();
		});

	};

	// $.keyCombos();

	$.bodyLoad();

	$.menuOpener = function(){
		$('.settings').on('click', function(){
			$(this).toggleClass('close');
			$('.wrapper').toggleClass('active');
			$('aside').toggleClass('inactive');
		});
	};

	$.menuOpener();

	$.cookieMonster = function(){

		var typeCookie = 'type',
			menuCookie = 'menu',
			cookieOptions = 'expires: 365, {path: '/'}';

			$('#' + $.cookie(typeCookie)).addClass('active');
			$('#keyboard').addClass($.cookie(typeCookie));
			$('#codebox').addClass($.cookie(typeCookie));

		$('menu a').on('click', function(e){
			e.preventDefault();
			$('#' + $.cookie(typeCookie)).removeClass('active');
			$.cookie(typeCookie, $(this).attr('id'), cookieOptions);
			$('#' + $.cookie(typeCookie)).addClass('active');
		});

		$('.settings').on('click', function(e){

			e.preventDefault();
			$.cookie(menuCookie, $('aside').attr('class'), cookieOptions);

		});

		$('aside').addClass($.cookie(menuCookie));

	};

	$.cookieMonster();

});