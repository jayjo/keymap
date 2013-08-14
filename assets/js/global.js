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

		$(document).ready(function(){

			var letterKeys = $('.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z');

			if ($('.cap').hasClass('capsOn')) {

				letterKeys.addClass('uppercase');
				$('#keyboard').addClass('capslock');
				$('.caps').addClass('activated');

			} else {

			}

		});

	};

	$.bodyLoad();

	$.keyBoard = function(){

		$('menu a').on('click', function(e){

			var keyClass = $(this).attr('id');

			$('#keyboard').removeClass().addClass(keyClass).addClass('showing');
			$('#codebox').removeClass().addClass(keyClass);
			$(this).addClass('active').siblings().removeClass();

		});

		$('.cap').on('click', function(){

			var letterKeys = $('.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z');

			letterKeys.toggleClass('uppercase');
			$(this).toggleClass('capsOn');
			$('.caps').toggleClass('activated');
			$('#keyboard').toggleClass('capslock');

		});

		return false;

	};

	$.keyBoard();

	$.keyCodeKeyboardCodes = function() {

		$.Press = function() {

			$('key').on('mousedown', function(){

				$('#codebox').addClass('active');
				$('key:not(this)').removeClass('active');

				var dataKey = $(this).attr('data-key'),
					dataLMTH = $(this).attr('data-lmth'),
					dataUni = $(this).attr('data-uni'),
					dataUniCaps = $(this).attr('data-unicaps'),
					dataAscii = $(this).attr('data-ascii');

				$('#codebox input').addClass('active');

				if ($('#keyboard').hasClass('charcode')) {

					$('#codebox input').val(dataKey);

				} else if (!$('#keyboard').hasClass('capslock') && $('#keyboard').hasClass('unicode')) {

					$('#codebox input').val(dataUni);

				} else if ($('#keyboard').hasClass('entities')) {

					$('#codebox input').val(dataLMTH);

				} else if ($('#keyboard').hasClass('ascii')) {

					$('#codebox input').val(dataLMTH);

				} else if ($('#keyboard').hasClass('unicode') && $('#keyboard').hasClass('capslock')) {

					$('#codebox input').val(dataUniCaps);

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
			capsCookie = 'cap',
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

		$('.cap').on('click', function(e){

			e.preventDefault();
			$.cookie(capsCookie, $(this).attr('class'), cookieOptions);

		});

		$('aside').addClass($.cookie(menuCookie));
		$('.cap').addClass($.cookie(capsCookie));

	};

	$.cookieMonster();

});