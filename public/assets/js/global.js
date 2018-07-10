jQuery(document).ready(function($) {

	var $document = $(document);

	// Cookie Variables
	var menuCookie			= 'menu',
			cookieOptions 	= "expires: 365, path: ''",
			themeCookie			= 'theme',
			typeCookie			= 'code type';

	displayKey = function(key, event) {
		$("key.active").removeClass("active");

		var dataKey = key.attr('data-key'),
				dataLMTH = key.attr('data-lmth'),
				dataUni = key.attr('data-uni'),
				dataUniCaps = key.attr('data-unicaps'),
				dataEncoded = key.attr('data-encode'),
				dataEncodedCaps = key.attr('data-encodecaps');

		var isShiftKey  = event.shiftKey ? true : false,
				isCapslock  = $('#keyboard').hasClass('capslock'),
				isCharcode  = $('#keyboard').hasClass('charcode'),
				isUnicode   = $('#keyboard').hasClass('unicode'),
				isURLEncode = $('#keyboard').hasClass('encoded');

		var isCapitals = isCapslock || isShiftKey ? true : false;
		var dataToDisplay = false;

		if (isCharcode) {
			dataToDisplay = dataKey;

		} else if (!isCapitals && isUnicode) {
			dataToDisplay = dataUni;

		}  else if (isURLEncode && !isCapitals) {
			dataToDisplay = dataEncoded;

		} else if (isUnicode && isCapitals) {
			dataToDisplay = dataUniCaps;

		} else if (isURLEncode && isCapitals) {
			dataToDisplay = dataEncodedCaps;
		}

		if(dataToDisplay) {
			key.addClass("active");
			key.click();

			var codeBox = $('#codebox input');

			codeBox.val(dataToDisplay);
			$('#codebox').addClass('active');
		}

		// At the moment keys that are 'hidden' do not have an
		// active state So this doesnt really do much useful.
		if(isShiftKey) {
			$("key.shft").addClass("active");
		}

		// Clipboard business
		var copyKey = new ClipboardJS('key', {
			text: function(trigger){
				return dataToDisplay;
			}
		});

		copyKey.on('success', function(e) {
	    copyKey.destroy();
		});

	};

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

		$document.ready(function(){

			if ($('aside').hasClass('inactive')) {
				$('.wrapper').removeClass('active');
				$('.settings').removeClass('close');
			}
			else if (!$('aside').hasClass('inactive')) {
				$('.wrapper').addClass('active');
				$('.settings').addClass('close');
			}

		});


		$document.ready(function(){

			if ($('.cap').hasClass('capsOn')) {

				letterKeys.addClass('uppercase');
				$('#keyboard').addClass('capslock');
				$('.caps').addClass('activated');

			} else {

			}

		});

		$document.on("keydown", function(ev) {
			if(ev.shiftKey) {
				letterKeys.addClass('uppercase');
				$('#keyboard').addClass('capslock');
			}
		});

		$document.on("keyup", function(ev) {
			if(!$('.cap').hasClass('capsOn') && !ev.shiftKey) {
				letterKeys.removeClass('uppercase');
				$('#keyboard').removeClass('capslock');
			}
		});

	};

	$.bodyLoad();

	$.keyBoard = function(){

		$('.codetype a').on('click', function(e){

			var keyClass = $(this).attr('id');

			Cookies.set(typeCookie, $(this).attr('id'), cookieOptions);

			$('#keyboard').removeClass().addClass(keyClass).addClass('showing');
			$('#codebox').removeClass().addClass(keyClass);
			$(this).addClass('active').siblings().removeClass();

			if ($('.cap').hasClass('capsOn')) {
				$('#keyboard').addClass('capslock');
			}

			// MIXPANEL
			mixpanel.track("Clicked Something", {"Element": keyClass});

		});

		$('.cap').on('click', function(){

			letterKeys.toggleClass('uppercase');
			$(this).toggleClass('capsOn');
			$('.caps').toggleClass('activated');
			$('#keyboard').toggleClass('capslock');

			// MIXPANEL
			mixpanel.track("Clicked Something", {"Element": "Caps Lock"});

		});

		return false;

	};

	$.keyBoard();

	$.keyCodeKeyboardCodes = function() {

		$.Press = function() {

			$('key').on('mousedown', function(ev){
				displayKey($(this), ev);
			});

		};

		$.KeyPress = function() {

			$document.on('keydown', function(ev) {
				var key = $("[data-key=" + ev.keyCode + "]");
				displayKey(key, ev);
				ev.preventDefault();
			});

		};

		$.Depress = function() {

			$('key').on('mouseup', function(e){

				$('#codebox').removeClass('active');

				var depress = e.which;

				$(this).removeClass('active');

				// MIXPANEL
				mixpanel.track("Key Clicked", {
					"Key": $(this).text()
				});

			});

		};

		$.KeyDepress = function() {

			$document.on('keyup', function(e){

				var key = $("[data-key=" + e.keyCode + "]");
				key.removeClass("active");

				$('#codebox').removeClass('active');

				var depress = e.which;

				// MIXPANEL
				mixpanel.track("Key Pressed", {
					"Key": key.text()
				});

			});

		};

		$.Press();
		$.Depress();

		$.KeyPress();
		$.KeyDepress();

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
			$('aside').toggleClass('active');

			Cookies.set(menuCookie, $('aside').attr('class'), cookieOptions);

			// MIXPANEL
			mixpanel.track("Clicked Something", {"Element": "Settings"});
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

	$('menu.theme a').on('click', function(){
		var themeText = $(this).text(),
				theme 		= $(this).attr('class');
		$('.theme-switcher').text(themeText);
		$(this).addClass('active').siblings().removeClass('active');
		$('body').removeClass().addClass(theme);
		Cookies.set(themeCookie, theme, {cookieOptions});
		$('menu.theme').removeClass('open');
		// MIXPANEL
		mixpanel.track("Clicked Something", {"Element": "Theme - " + theme});
	});

	$('.theme-switcher').on('click', function(){
		$('menu.theme').toggleClass('open');
	});

	// Set Cookies
	$('body').addClass(Cookies.get(themeCookie));
	$('.theme-switcher').text(Cookies.get(themeCookie));
	$('#keyboard, #codebox').addClass(Cookies.get(typeCookie));
	$('a#' + Cookies.get(typeCookie)).addClass('active');

});
jQuery(document).ready(function($) {
  // Draggable Menu
  $('#keypad').draggable();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwia2V5cGFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFRBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG5cdHZhciAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuXHQvLyBDb29raWUgVmFyaWFibGVzXG5cdHZhciBtZW51Q29va2llXHRcdFx0PSAnbWVudScsXG5cdFx0XHRjb29raWVPcHRpb25zIFx0PSBcImV4cGlyZXM6IDM2NSwgcGF0aDogJydcIixcblx0XHRcdHRoZW1lQ29va2llXHRcdFx0PSAndGhlbWUnLFxuXHRcdFx0dHlwZUNvb2tpZVx0XHRcdD0gJ2NvZGUgdHlwZSc7XG5cblx0ZGlzcGxheUtleSA9IGZ1bmN0aW9uKGtleSwgZXZlbnQpIHtcblx0XHQkKFwia2V5LmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdHZhciBkYXRhS2V5ID0ga2V5LmF0dHIoJ2RhdGEta2V5JyksXG5cdFx0XHRcdGRhdGFMTVRIID0ga2V5LmF0dHIoJ2RhdGEtbG10aCcpLFxuXHRcdFx0XHRkYXRhVW5pID0ga2V5LmF0dHIoJ2RhdGEtdW5pJyksXG5cdFx0XHRcdGRhdGFVbmlDYXBzID0ga2V5LmF0dHIoJ2RhdGEtdW5pY2FwcycpLFxuXHRcdFx0XHRkYXRhRW5jb2RlZCA9IGtleS5hdHRyKCdkYXRhLWVuY29kZScpLFxuXHRcdFx0XHRkYXRhRW5jb2RlZENhcHMgPSBrZXkuYXR0cignZGF0YS1lbmNvZGVjYXBzJyk7XG5cblx0XHR2YXIgaXNTaGlmdEtleSAgPSBldmVudC5zaGlmdEtleSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0aXNDYXBzbG9jayAgPSAkKCcja2V5Ym9hcmQnKS5oYXNDbGFzcygnY2Fwc2xvY2snKSxcblx0XHRcdFx0aXNDaGFyY29kZSAgPSAkKCcja2V5Ym9hcmQnKS5oYXNDbGFzcygnY2hhcmNvZGUnKSxcblx0XHRcdFx0aXNVbmljb2RlICAgPSAkKCcja2V5Ym9hcmQnKS5oYXNDbGFzcygndW5pY29kZScpLFxuXHRcdFx0XHRpc1VSTEVuY29kZSA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCdlbmNvZGVkJyk7XG5cblx0XHR2YXIgaXNDYXBpdGFscyA9IGlzQ2Fwc2xvY2sgfHwgaXNTaGlmdEtleSA/IHRydWUgOiBmYWxzZTtcblx0XHR2YXIgZGF0YVRvRGlzcGxheSA9IGZhbHNlO1xuXG5cdFx0aWYgKGlzQ2hhcmNvZGUpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhS2V5O1xuXG5cdFx0fSBlbHNlIGlmICghaXNDYXBpdGFscyAmJiBpc1VuaWNvZGUpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhVW5pO1xuXG5cdFx0fSAgZWxzZSBpZiAoaXNVUkxFbmNvZGUgJiYgIWlzQ2FwaXRhbHMpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhRW5jb2RlZDtcblxuXHRcdH0gZWxzZSBpZiAoaXNVbmljb2RlICYmIGlzQ2FwaXRhbHMpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhVW5pQ2FwcztcblxuXHRcdH0gZWxzZSBpZiAoaXNVUkxFbmNvZGUgJiYgaXNDYXBpdGFscykge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFFbmNvZGVkQ2Fwcztcblx0XHR9XG5cblx0XHRpZihkYXRhVG9EaXNwbGF5KSB7XG5cdFx0XHRrZXkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHRrZXkuY2xpY2soKTtcblxuXHRcdFx0dmFyIGNvZGVCb3ggPSAkKCcjY29kZWJveCBpbnB1dCcpO1xuXG5cdFx0XHRjb2RlQm94LnZhbChkYXRhVG9EaXNwbGF5KTtcblx0XHRcdCQoJyNjb2RlYm94JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH1cblxuXHRcdC8vIEF0IHRoZSBtb21lbnQga2V5cyB0aGF0IGFyZSAnaGlkZGVuJyBkbyBub3QgaGF2ZSBhblxuXHRcdC8vIGFjdGl2ZSBzdGF0ZSBTbyB0aGlzIGRvZXNudCByZWFsbHkgZG8gbXVjaCB1c2VmdWwuXG5cdFx0aWYoaXNTaGlmdEtleSkge1xuXHRcdFx0JChcImtleS5zaGZ0XCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdH1cblxuXHRcdC8vIENsaXBib2FyZCBidXNpbmVzc1xuXHRcdHZhciBjb3B5S2V5ID0gbmV3IENsaXBib2FyZEpTKCdrZXknLCB7XG5cdFx0XHR0ZXh0OiBmdW5jdGlvbih0cmlnZ2VyKXtcblx0XHRcdFx0cmV0dXJuIGRhdGFUb0Rpc3BsYXk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRjb3B5S2V5Lm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZSkge1xuXHQgICAgY29weUtleS5kZXN0cm95KCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHQkKCcuY29kZS1pbm5lci5kYXJrJykuaGlkZSgpO1xuXG5cdHZhciBsZXR0ZXJLZXlzID0gJCgnLmEsLmIsLmMsLmQsLmUsLmYsLmcsLmgsLmksLmosLmssLmwsLm0sLm4sLm8sLnAsLnEsLnIsLnMsLnQsLnUsLnYsLncsLngsLnksLnosLjEsLjIsLjMsLjQsLjUsLjYsLjcsLjgsLjksLjAsLnRpbCwuaHlwLC5lcXUsLmxicmFjaywucmJyYWNrLC5icywuY29sLC5hcG9zLC5jb21tLC5ncmVhdCwucXVlc3QnKTtcblxuXHQkLmxvYWRpbmdTdHVmZiA9IGZ1bmN0aW9uKCl7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCdhc2lkZScpLmFuaW1hdGUoe29wYWNpdHk6IDF9KTtcblx0XHR9LCA3NSk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcud3JhcHBlcicpLmFuaW1hdGUoe29wYWNpdHk6IDF9KTtcblx0XHR9LCAxNTApO1xuXG5cdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ3Nob3dpbmcnKTtcblxuXHR9O1xuXG5cdCQubG9hZGluZ1N0dWZmKCk7XG5cblx0JC5ib2R5TG9hZCA9IGZ1bmN0aW9uKCl7XG5cblx0XHQkZG9jdW1lbnQucmVhZHkoZnVuY3Rpb24oKXtcblxuXHRcdFx0aWYgKCQoJ2FzaWRlJykuaGFzQ2xhc3MoJ2luYWN0aXZlJykpIHtcblx0XHRcdFx0JCgnLndyYXBwZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJy5zZXR0aW5ncycpLnJlbW92ZUNsYXNzKCdjbG9zZScpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoISQoJ2FzaWRlJykuaGFzQ2xhc3MoJ2luYWN0aXZlJykpIHtcblx0XHRcdFx0JCgnLndyYXBwZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJy5zZXR0aW5ncycpLmFkZENsYXNzKCdjbG9zZScpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblxuXHRcdCRkb2N1bWVudC5yZWFkeShmdW5jdGlvbigpe1xuXG5cdFx0XHRpZiAoJCgnLmNhcCcpLmhhc0NsYXNzKCdjYXBzT24nKSkge1xuXG5cdFx0XHRcdGxldHRlcktleXMuYWRkQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdFx0JCgnLmNhcHMnKS5hZGRDbGFzcygnYWN0aXZhdGVkJyk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdFx0JGRvY3VtZW50Lm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldikge1xuXHRcdFx0aWYoZXYuc2hpZnRLZXkpIHtcblx0XHRcdFx0bGV0dGVyS2V5cy5hZGRDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JGRvY3VtZW50Lm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oZXYpIHtcblx0XHRcdGlmKCEkKCcuY2FwJykuaGFzQ2xhc3MoJ2NhcHNPbicpICYmICFldi5zaGlmdEtleSkge1xuXHRcdFx0XHRsZXR0ZXJLZXlzLnJlbW92ZUNsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykucmVtb3ZlQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fTtcblxuXHQkLmJvZHlMb2FkKCk7XG5cblx0JC5rZXlCb2FyZCA9IGZ1bmN0aW9uKCl7XG5cblx0XHQkKCcuY29kZXR5cGUgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHR2YXIga2V5Q2xhc3MgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cblx0XHRcdENvb2tpZXMuc2V0KHR5cGVDb29raWUsICQodGhpcykuYXR0cignaWQnKSwgY29va2llT3B0aW9ucyk7XG5cblx0XHRcdCQoJyNrZXlib2FyZCcpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moa2V5Q2xhc3MpLmFkZENsYXNzKCdzaG93aW5nJyk7XG5cdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moa2V5Q2xhc3MpO1xuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygpO1xuXG5cdFx0XHRpZiAoJCgnLmNhcCcpLmhhc0NsYXNzKCdjYXBzT24nKSkge1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBrZXlDbGFzc30pO1xuXG5cdFx0fSk7XG5cblx0XHQkKCcuY2FwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblxuXHRcdFx0bGV0dGVyS2V5cy50b2dnbGVDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjYXBzT24nKTtcblx0XHRcdCQoJy5jYXBzJykudG9nZ2xlQ2xhc3MoJ2FjdGl2YXRlZCcpO1xuXHRcdFx0JCgnI2tleWJvYXJkJykudG9nZ2xlQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cblx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjogXCJDYXBzIExvY2tcIn0pO1xuXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fTtcblxuXHQkLmtleUJvYXJkKCk7XG5cblx0JC5rZXlDb2RlS2V5Ym9hcmRDb2RlcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JC5QcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkKCdrZXknKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXYpe1xuXHRcdFx0XHRkaXNwbGF5S2V5KCQodGhpcyksIGV2KTtcblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuS2V5UHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JGRvY3VtZW50Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0dmFyIGtleSA9ICQoXCJbZGF0YS1rZXk9XCIgKyBldi5rZXlDb2RlICsgXCJdXCIpO1xuXHRcdFx0XHRkaXNwbGF5S2V5KGtleSwgZXYpO1xuXHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5EZXByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCQoJ2tleScpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0dmFyIGRlcHJlc3MgPSBlLndoaWNoO1xuXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRcdG1peHBhbmVsLnRyYWNrKFwiS2V5IENsaWNrZWRcIiwge1xuXHRcdFx0XHRcdFwiS2V5XCI6ICQodGhpcykudGV4dCgpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLktleURlcHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JGRvY3VtZW50Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHRcdHZhciBrZXkgPSAkKFwiW2RhdGEta2V5PVwiICsgZS5rZXlDb2RlICsgXCJdXCIpO1xuXHRcdFx0XHRrZXkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cblx0XHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0dmFyIGRlcHJlc3MgPSBlLndoaWNoO1xuXG5cdFx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRcdG1peHBhbmVsLnRyYWNrKFwiS2V5IFByZXNzZWRcIiwge1xuXHRcdFx0XHRcdFwiS2V5XCI6IGtleS50ZXh0KClcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuUHJlc3MoKTtcblx0XHQkLkRlcHJlc3MoKTtcblxuXHRcdCQuS2V5UHJlc3MoKTtcblx0XHQkLktleURlcHJlc3MoKTtcblxuXHR9O1xuXG5cdCQua2V5Q29kZUtleWJvYXJkQ29kZXMoKTtcblxuXHQkLmtleUNvbWJvcyA9IGZ1bmN0aW9uKCl7XG5cblx0XHQkKCcucmVsb2FkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdH0pO1xuXG5cdH07XG5cblx0Ly8gJC5rZXlDb21ib3MoKTtcblxuXHQkLm1lbnVPcGVuZXIgPSBmdW5jdGlvbigpe1xuXHRcdCQoJy5zZXR0aW5ncycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjbG9zZScpO1xuXHRcdFx0JCgnLndyYXBwZXInKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCdhc2lkZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0Q29va2llcy5zZXQobWVudUNvb2tpZSwgJCgnYXNpZGUnKS5hdHRyKCdjbGFzcycpLCBjb29raWVPcHRpb25zKTtcblxuXHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBcIlNldHRpbmdzXCJ9KTtcblx0XHR9KTtcblx0fTtcblxuXHQkLm1lbnVPcGVuZXIoKTtcblxuXHQkLmxvZ29DbGlja2VyID0gZnVuY3Rpb24oKXtcblx0XHQkKCcjbG9nbycpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnI2NvZGVib3gnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCcuY29kZS1pbm5lcicpLmhpZGUoKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyLmRhcmsnKS5zaG93KCk7XG5cdFx0fSk7XG5cdFx0JCgnI2xvZ28nKS5vbignbW91c2V1cCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyJykuc2hvdygpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXIuZGFyaycpLmhpZGUoKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmxvZ29DbGlja2VyKCk7XG5cblx0JCgnbWVudS50aGVtZSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHR2YXIgdGhlbWVUZXh0ID0gJCh0aGlzKS50ZXh0KCksXG5cdFx0XHRcdHRoZW1lIFx0XHQ9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblx0XHQkKCcudGhlbWUtc3dpdGNoZXInKS50ZXh0KHRoZW1lVGV4dCk7XG5cdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3ModGhlbWUpO1xuXHRcdENvb2tpZXMuc2V0KHRoZW1lQ29va2llLCB0aGVtZSwge2Nvb2tpZU9wdGlvbnN9KTtcblx0XHQkKCdtZW51LnRoZW1lJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcblx0XHQvLyBNSVhQQU5FTFxuXHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBcIlRoZW1lIC0gXCIgKyB0aGVtZX0pO1xuXHR9KTtcblxuXHQkKCcudGhlbWUtc3dpdGNoZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ21lbnUudGhlbWUnKS50b2dnbGVDbGFzcygnb3BlbicpO1xuXHR9KTtcblxuXHQvLyBTZXQgQ29va2llc1xuXHQkKCdib2R5JykuYWRkQ2xhc3MoQ29va2llcy5nZXQodGhlbWVDb29raWUpKTtcblx0JCgnLnRoZW1lLXN3aXRjaGVyJykudGV4dChDb29raWVzLmdldCh0aGVtZUNvb2tpZSkpO1xuXHQkKCcja2V5Ym9hcmQsICNjb2RlYm94JykuYWRkQ2xhc3MoQ29va2llcy5nZXQodHlwZUNvb2tpZSkpO1xuXHQkKCdhIycgKyBDb29raWVzLmdldCh0eXBlQ29va2llKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG59KTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgLy8gRHJhZ2dhYmxlIE1lbnVcbiAgJCgnI2tleXBhZCcpLmRyYWdnYWJsZSgpO1xufSk7Il19
