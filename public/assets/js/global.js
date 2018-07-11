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

	$(document).keyup(function(e) {
	    console.log(e.keyCode);
	});

});
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwia2V5cGFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuXHR2YXIgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cblx0Ly8gQ29va2llIFZhcmlhYmxlc1xuXHR2YXIgbWVudUNvb2tpZVx0XHRcdD0gJ21lbnUnLFxuXHRcdFx0Y29va2llT3B0aW9ucyBcdD0gXCJleHBpcmVzOiAzNjUsIHBhdGg6ICcnXCIsXG5cdFx0XHR0aGVtZUNvb2tpZVx0XHRcdD0gJ3RoZW1lJyxcblx0XHRcdHR5cGVDb29raWVcdFx0XHQ9ICdjb2RlIHR5cGUnO1xuXG5cdGRpc3BsYXlLZXkgPSBmdW5jdGlvbihrZXksIGV2ZW50KSB7XG5cdFx0JChcImtleS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cblx0XHR2YXIgZGF0YUtleSA9IGtleS5hdHRyKCdkYXRhLWtleScpLFxuXHRcdFx0XHRkYXRhTE1USCA9IGtleS5hdHRyKCdkYXRhLWxtdGgnKSxcblx0XHRcdFx0ZGF0YVVuaSA9IGtleS5hdHRyKCdkYXRhLXVuaScpLFxuXHRcdFx0XHRkYXRhVW5pQ2FwcyA9IGtleS5hdHRyKCdkYXRhLXVuaWNhcHMnKSxcblx0XHRcdFx0ZGF0YUVuY29kZWQgPSBrZXkuYXR0cignZGF0YS1lbmNvZGUnKSxcblx0XHRcdFx0ZGF0YUVuY29kZWRDYXBzID0ga2V5LmF0dHIoJ2RhdGEtZW5jb2RlY2FwcycpO1xuXG5cdFx0dmFyIGlzU2hpZnRLZXkgID0gZXZlbnQuc2hpZnRLZXkgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGlzQ2Fwc2xvY2sgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2NhcHNsb2NrJyksXG5cdFx0XHRcdGlzQ2hhcmNvZGUgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2NoYXJjb2RlJyksXG5cdFx0XHRcdGlzVW5pY29kZSAgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ3VuaWNvZGUnKSxcblx0XHRcdFx0aXNVUkxFbmNvZGUgPSAkKCcja2V5Ym9hcmQnKS5oYXNDbGFzcygnZW5jb2RlZCcpO1xuXG5cdFx0dmFyIGlzQ2FwaXRhbHMgPSBpc0NhcHNsb2NrIHx8IGlzU2hpZnRLZXkgPyB0cnVlIDogZmFsc2U7XG5cdFx0dmFyIGRhdGFUb0Rpc3BsYXkgPSBmYWxzZTtcblxuXHRcdGlmIChpc0NoYXJjb2RlKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUtleTtcblxuXHRcdH0gZWxzZSBpZiAoIWlzQ2FwaXRhbHMgJiYgaXNVbmljb2RlKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YVVuaTtcblxuXHRcdH0gIGVsc2UgaWYgKGlzVVJMRW5jb2RlICYmICFpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUVuY29kZWQ7XG5cblx0XHR9IGVsc2UgaWYgKGlzVW5pY29kZSAmJiBpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YVVuaUNhcHM7XG5cblx0XHR9IGVsc2UgaWYgKGlzVVJMRW5jb2RlICYmIGlzQ2FwaXRhbHMpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhRW5jb2RlZENhcHM7XG5cdFx0fVxuXG5cdFx0aWYoZGF0YVRvRGlzcGxheSkge1xuXHRcdFx0a2V5LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0a2V5LmNsaWNrKCk7XG5cblx0XHRcdHZhciBjb2RlQm94ID0gJCgnI2NvZGVib3ggaW5wdXQnKTtcblxuXHRcdFx0Y29kZUJveC52YWwoZGF0YVRvRGlzcGxheSk7XG5cdFx0XHQkKCcjY29kZWJveCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHQvLyBBdCB0aGUgbW9tZW50IGtleXMgdGhhdCBhcmUgJ2hpZGRlbicgZG8gbm90IGhhdmUgYW5cblx0XHQvLyBhY3RpdmUgc3RhdGUgU28gdGhpcyBkb2VzbnQgcmVhbGx5IGRvIG11Y2ggdXNlZnVsLlxuXHRcdGlmKGlzU2hpZnRLZXkpIHtcblx0XHRcdCQoXCJrZXkuc2hmdFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHR9XG5cblx0XHQvLyBDbGlwYm9hcmQgYnVzaW5lc3Ncblx0XHR2YXIgY29weUtleSA9IG5ldyBDbGlwYm9hcmRKUygna2V5Jywge1xuXHRcdFx0dGV4dDogZnVuY3Rpb24odHJpZ2dlcil7XG5cdFx0XHRcdHJldHVybiBkYXRhVG9EaXNwbGF5O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29weUtleS5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcblx0ICAgIGNvcHlLZXkuZGVzdHJveSgpO1xuXHRcdH0pO1xuXG5cdH07XG5cblx0JCgnLmNvZGUtaW5uZXIuZGFyaycpLmhpZGUoKTtcblxuXHR2YXIgbGV0dGVyS2V5cyA9ICQoJy5hLC5iLC5jLC5kLC5lLC5mLC5nLC5oLC5pLC5qLC5rLC5sLC5tLC5uLC5vLC5wLC5xLC5yLC5zLC50LC51LC52LC53LC54LC55LC56LC4xLC4yLC4zLC40LC41LC42LC43LC44LC45LC4wLC50aWwsLmh5cCwuZXF1LC5sYnJhY2ssLnJicmFjaywuYnMsLmNvbCwuYXBvcywuY29tbSwuZ3JlYXQsLnF1ZXN0Jyk7XG5cblx0JC5sb2FkaW5nU3R1ZmYgPSBmdW5jdGlvbigpe1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnYXNpZGUnKS5hbmltYXRlKHtvcGFjaXR5OiAxfSk7XG5cdFx0fSwgNzUpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnLndyYXBwZXInKS5hbmltYXRlKHtvcGFjaXR5OiAxfSk7XG5cdFx0fSwgMTUwKTtcblxuXHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdzaG93aW5nJyk7XG5cblx0fTtcblxuXHQkLmxvYWRpbmdTdHVmZigpO1xuXG5cdCQuYm9keUxvYWQgPSBmdW5jdGlvbigpe1xuXG5cdFx0JGRvY3VtZW50LnJlYWR5KGZ1bmN0aW9uKCl7XG5cblx0XHRcdGlmICgkKCdhc2lkZScpLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG5cdFx0XHRcdCQoJy53cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuc2V0dGluZ3MnKS5yZW1vdmVDbGFzcygnY2xvc2UnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCEkKCdhc2lkZScpLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG5cdFx0XHRcdCQoJy53cmFwcGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuc2V0dGluZ3MnKS5hZGRDbGFzcygnY2xvc2UnKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cblx0XHQkZG9jdW1lbnQucmVhZHkoZnVuY3Rpb24oKXtcblxuXHRcdFx0aWYgKCQoJy5jYXAnKS5oYXNDbGFzcygnY2Fwc09uJykpIHtcblxuXHRcdFx0XHRsZXR0ZXJLZXlzLmFkZENsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHRcdCQoJy5jYXBzJykuYWRkQ2xhc3MoJ2FjdGl2YXRlZCcpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdCRkb2N1bWVudC5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZXYpIHtcblx0XHRcdGlmKGV2LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdGxldHRlcktleXMuYWRkQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRkb2N1bWVudC5vbihcImtleXVwXCIsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRpZighJCgnLmNhcCcpLmhhc0NsYXNzKCdjYXBzT24nKSAmJiAhZXYuc2hpZnRLZXkpIHtcblx0XHRcdFx0bGV0dGVyS2V5cy5yZW1vdmVDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLnJlbW92ZUNsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH07XG5cblx0JC5ib2R5TG9hZCgpO1xuXG5cdCQua2V5Qm9hcmQgPSBmdW5jdGlvbigpe1xuXG5cdFx0JCgnLmNvZGV0eXBlIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblxuXHRcdFx0dmFyIGtleUNsYXNzID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuXG5cdFx0XHRDb29raWVzLnNldCh0eXBlQ29va2llLCAkKHRoaXMpLmF0dHIoJ2lkJyksIGNvb2tpZU9wdGlvbnMpO1xuXG5cdFx0XHQkKCcja2V5Ym9hcmQnKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGtleUNsYXNzKS5hZGRDbGFzcygnc2hvd2luZycpO1xuXHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGtleUNsYXNzKTtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoKTtcblxuXHRcdFx0aWYgKCQoJy5jYXAnKS5oYXNDbGFzcygnY2Fwc09uJykpIHtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjoga2V5Q2xhc3N9KTtcblxuXHRcdH0pO1xuXG5cdFx0JCgnLmNhcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cblx0XHRcdGxldHRlcktleXMudG9nZ2xlQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnY2Fwc09uJyk7XG5cdFx0XHQkKCcuY2FwcycpLnRvZ2dsZUNsYXNzKCdhY3RpdmF0ZWQnKTtcblx0XHRcdCQoJyNrZXlib2FyZCcpLnRvZ2dsZUNsYXNzKCdjYXBzbG9jaycpO1xuXG5cdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiQ2FwcyBMb2NrXCJ9KTtcblxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXG5cdH07XG5cblx0JC5rZXlCb2FyZCgpO1xuXG5cdCQua2V5Q29kZUtleWJvYXJkQ29kZXMgPSBmdW5jdGlvbigpIHtcblxuXHRcdCQuUHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JCgna2V5Jykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2KXtcblx0XHRcdFx0ZGlzcGxheUtleSgkKHRoaXMpLCBldik7XG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLktleVByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCRkb2N1bWVudC5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRcdHZhciBrZXkgPSAkKFwiW2RhdGEta2V5PVwiICsgZXYua2V5Q29kZSArIFwiXVwiKTtcblx0XHRcdFx0ZGlzcGxheUtleShrZXksIGV2KTtcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuRGVwcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkKCdrZXknKS5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHRcdHZhciBkZXByZXNzID0gZS53aGljaDtcblxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0XHRtaXhwYW5lbC50cmFjayhcIktleSBDbGlja2VkXCIsIHtcblx0XHRcdFx0XHRcIktleVwiOiAkKHRoaXMpLnRleHQoKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5LZXlEZXByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCRkb2N1bWVudC5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcblxuXHRcdFx0XHR2YXIga2V5ID0gJChcIltkYXRhLWtleT1cIiArIGUua2V5Q29kZSArIFwiXVwiKTtcblx0XHRcdFx0a2V5LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHRcdHZhciBkZXByZXNzID0gZS53aGljaDtcblxuXHRcdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0XHRtaXhwYW5lbC50cmFjayhcIktleSBQcmVzc2VkXCIsIHtcblx0XHRcdFx0XHRcIktleVwiOiBrZXkudGV4dCgpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLlByZXNzKCk7XG5cdFx0JC5EZXByZXNzKCk7XG5cblx0XHQkLktleVByZXNzKCk7XG5cdFx0JC5LZXlEZXByZXNzKCk7XG5cblx0fTtcblxuXHQkLmtleUNvZGVLZXlib2FyZENvZGVzKCk7XG5cblx0JC5rZXlDb21ib3MgPSBmdW5jdGlvbigpe1xuXG5cdFx0JCgnLnJlbG9hZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdC8vICQua2V5Q29tYm9zKCk7XG5cblx0JC5tZW51T3BlbmVyID0gZnVuY3Rpb24oKXtcblx0XHQkKCcuc2V0dGluZ3MnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnY2xvc2UnKTtcblx0XHRcdCQoJy53cmFwcGVyJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnYXNpZGUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdENvb2tpZXMuc2V0KG1lbnVDb29raWUsICQoJ2FzaWRlJykuYXR0cignY2xhc3MnKSwgY29va2llT3B0aW9ucyk7XG5cblx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjogXCJTZXR0aW5nc1wifSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5tZW51T3BlbmVyKCk7XG5cblx0JC5sb2dvQ2xpY2tlciA9IGZ1bmN0aW9uKCl7XG5cdFx0JCgnI2xvZ28nKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJyNjb2RlYm94JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXInKS5oaWRlKCk7XG5cdFx0XHQkKCcuY29kZS1pbm5lci5kYXJrJykuc2hvdygpO1xuXHRcdH0pO1xuXHRcdCQoJyNsb2dvJykub24oJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCcuY29kZS1pbm5lcicpLnNob3coKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyLmRhcmsnKS5oaWRlKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5sb2dvQ2xpY2tlcigpO1xuXG5cdCQoJ21lbnUudGhlbWUgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRoZW1lVGV4dCA9ICQodGhpcykudGV4dCgpLFxuXHRcdFx0XHR0aGVtZSBcdFx0PSAkKHRoaXMpLmF0dHIoJ2NsYXNzJyk7XG5cdFx0JCgnLnRoZW1lLXN3aXRjaGVyJykudGV4dCh0aGVtZVRleHQpO1xuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHRoZW1lKTtcblx0XHRDb29raWVzLnNldCh0aGVtZUNvb2tpZSwgdGhlbWUsIHtjb29raWVPcHRpb25zfSk7XG5cdFx0JCgnbWVudS50aGVtZScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0Ly8gTUlYUEFORUxcblx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjogXCJUaGVtZSAtIFwiICsgdGhlbWV9KTtcblx0fSk7XG5cblx0JCgnLnRoZW1lLXN3aXRjaGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKCdtZW51LnRoZW1lJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0fSk7XG5cblx0Ly8gU2V0IENvb2tpZXNcblx0JCgnYm9keScpLmFkZENsYXNzKENvb2tpZXMuZ2V0KHRoZW1lQ29va2llKSk7XG5cdCQoJy50aGVtZS1zd2l0Y2hlcicpLnRleHQoQ29va2llcy5nZXQodGhlbWVDb29raWUpKTtcblx0JCgnI2tleWJvYXJkLCAjY29kZWJveCcpLmFkZENsYXNzKENvb2tpZXMuZ2V0KHR5cGVDb29raWUpKTtcblx0JCgnYSMnICsgQ29va2llcy5nZXQodHlwZUNvb2tpZSkpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHQkKGRvY3VtZW50KS5rZXl1cChmdW5jdGlvbihlKSB7XG5cdCAgICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xuXHR9KTtcblxufSk7IiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gIFxuICAkKFwiLmV4cGFuZFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgICQoJy5taW5pbWl6ZScpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICQoJy5rZXlwYWQnKS5kcmFnZ2FibGUoKTtcbiAgICAkKCcua2V5cGFkJykuYWRkQ2xhc3MoJ3VuZG9ja2VkJyk7XG4gIH0pO1xuXG4gICQoXCIubWluaW1pemVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAkKCcuZXhwYW5kJykucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgJCgnLmtleXBhZCcpLmRyYWdnYWJsZSgnZGVzdHJveScpO1xuICAgICQoJy5rZXlwYWQnKS5yZW1vdmVDbGFzcygndW5kb2NrZWQnKS5hdHRyKCdzdHlsZScsICcnKVxuICAgICQoJy5rZXlwYWQnKS5yZW1vdmVDbGFzcygndW5kb2NrZWQnKTtcbiAgfSk7XG59KTsiXX0=
