jQuery(document).ready(function($) {

	$('.code-inner.dark').hide();

	var letterKeys = $('.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z,.1,.2,.3,.4,.5,.6,.7,.8,.9,.0,.til,.hyp,.equ,.lbrack,.rbrack,.bs,.col,.apos,.comm,.great,.quest');

	$.loadingStuff = function(){

		setTimeout(function(){
			$('aside').animate({opacity: 1});
		}, 75);

		setTimeout(function(){
			$('.wrapper').animate({opacity: 1});
		}, 150);

		$('#keyboard').addClass('showing');

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

			if ($('.cap').hasClass('capsOn')) {
				$('#keyboard').addClass('capslock');
			}

		});

		$('.cap').on('click', function(){

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
					dataEncoded = $(this).attr('data-encode'),
					dataEncodedCaps = $(this).attr('data-encodecaps');

				if ($('#keyboard').hasClass('charcode')) {

					$('#codebox input').val(dataKey);

				} else if (!$('#keyboard').hasClass('capslock') && $('#keyboard').hasClass('unicode')) {

					$('#codebox input').val(dataUni);

				}  else if ($('#keyboard').hasClass('encoded') && !$('#keyboard').hasClass('capslock')) {

					$('#codebox input').val(dataEncoded);

				} else if ($('#keyboard').hasClass('unicode') && $('#keyboard').hasClass('capslock')) {

					$('#codebox input').val(dataUniCaps);

				} else if ($('#keyboard').hasClass('encoded') && $('#keyboard').hasClass('capslock')) {

					$('#codebox input').val(dataEncodedCaps);

				}

				$(this).addClass('active');

			});

		};

		$.Depress = function() {

			$('key').on('mouseup', function(e){

				$('#codebox').removeClass('active');

				var depress = e.which;

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

	$.logoClicker = function(){
		$('#logo').on('mousedown', function(){
			$('#codebox').addClass('active');
			$('.code-inner').hide();
			$('.code-inner.dark').show();
		});
		$('#logo').on('mouseup', function(){
			$('#codebox').removeClass('active');
			$('.code-inner').show();
			$('.code-inner.dark').hide();
		});
	};

	$.logoClicker();

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