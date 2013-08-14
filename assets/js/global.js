jQuery(document).ready(function($) {

	$.keyBoard = function(){

		$('menu a').on('click', function(e){

			var keyClass = $(this).attr('id');

			$('#keyboard').removeClass().addClass(keyClass).addClass('showing');
			$('#codebox').removeClass().addClass(keyClass);
			$(this).addClass('active').siblings().removeClass();

		});

		return false;

	};

	$.loadingStuff = function(){

		setTimeout(function(){
			$('#keyboard').addClass('showing');
		}, 450);

	};

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

	$.keyCombos = function(){

		$('.reload').on('click', function(){
			location.reload();
		});

	};

	$.menuOpener = function(){
		$('.settings').on('click', function(){
			$(this).toggleClass('close');
			$('.wrapper').toggleClass('active');
			$('aside').toggleClass('inactive');
		});
	};

	$.keyBoard();
	$.loadingStuff();
	// $.keyCombos();
	$.keyCodeKeyboardCodes();
	$.menuOpener();

});