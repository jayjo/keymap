jQuery(document).ready(function($) {

	var $document = $(document);

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

		$('menu a').on('click', function(e){

			var keyClass = $(this).attr('id');

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
			$('aside').toggleClass('inactive');

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

			console.log('cookies')
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

	$('.light').on('click', function(){
		$('body').addClass('light');
		// MIXPANEL
		mixpanel.track("Clicked Something", {"Element": "Theme - Light"});
	});

	$('.dark').on('click', function(){
		$('body').removeClass('light');
		// MIXPANEL
		mixpanel.track("Clicked Something", {"Element": "Theme - Dark"});
	});

	// Copy values to the clipboard
	$.clipClip = function(){

		$('key').attr('data-clipboard-action', 'copy').attr('data-clipboard-target', '#codebox input');
		var Clip = new Clipboard('key');

	};

	$.clipClip();

	// MIXPANEL

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG5cdGRpc3BsYXlLZXkgPSBmdW5jdGlvbihrZXksIGV2ZW50KSB7XG5cdFx0JChcImtleS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cblx0XHR2YXIgZGF0YUtleSA9IGtleS5hdHRyKCdkYXRhLWtleScpLFxuXHRcdFx0XHRkYXRhTE1USCA9IGtleS5hdHRyKCdkYXRhLWxtdGgnKSxcblx0XHRcdFx0ZGF0YVVuaSA9IGtleS5hdHRyKCdkYXRhLXVuaScpLFxuXHRcdFx0XHRkYXRhVW5pQ2FwcyA9IGtleS5hdHRyKCdkYXRhLXVuaWNhcHMnKSxcblx0XHRcdFx0ZGF0YUVuY29kZWQgPSBrZXkuYXR0cignZGF0YS1lbmNvZGUnKSxcblx0XHRcdFx0ZGF0YUVuY29kZWRDYXBzID0ga2V5LmF0dHIoJ2RhdGEtZW5jb2RlY2FwcycpO1xuXG5cdFx0dmFyIGlzU2hpZnRLZXkgID0gZXZlbnQuc2hpZnRLZXkgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGlzQ2Fwc2xvY2sgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2NhcHNsb2NrJyksXG5cdFx0XHRcdGlzQ2hhcmNvZGUgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2NoYXJjb2RlJyksXG5cdFx0XHRcdGlzVW5pY29kZSAgID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ3VuaWNvZGUnKSxcblx0XHRcdFx0aXNVUkxFbmNvZGUgPSAkKCcja2V5Ym9hcmQnKS5oYXNDbGFzcygnZW5jb2RlZCcpO1xuXG5cdFx0dmFyIGlzQ2FwaXRhbHMgPSBpc0NhcHNsb2NrIHx8IGlzU2hpZnRLZXkgPyB0cnVlIDogZmFsc2U7XG5cdFx0dmFyIGRhdGFUb0Rpc3BsYXkgPSBmYWxzZTtcblxuXHRcdGlmIChpc0NoYXJjb2RlKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUtleTtcblxuXHRcdH0gZWxzZSBpZiAoIWlzQ2FwaXRhbHMgJiYgaXNVbmljb2RlKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YVVuaTtcblxuXHRcdH0gIGVsc2UgaWYgKGlzVVJMRW5jb2RlICYmICFpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUVuY29kZWQ7XG5cblx0XHR9IGVsc2UgaWYgKGlzVW5pY29kZSAmJiBpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YVVuaUNhcHM7XG5cblx0XHR9IGVsc2UgaWYgKGlzVVJMRW5jb2RlICYmIGlzQ2FwaXRhbHMpIHtcblx0XHRcdGRhdGFUb0Rpc3BsYXkgPSBkYXRhRW5jb2RlZENhcHM7XG5cdFx0fVxuXG5cdFx0aWYoZGF0YVRvRGlzcGxheSkge1xuXHRcdFx0a2V5LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0a2V5LmNsaWNrKCk7XG5cblx0XHRcdHZhciBjb2RlQm94ID0gJCgnI2NvZGVib3ggaW5wdXQnKTtcblxuXHRcdFx0Y29kZUJveC52YWwoZGF0YVRvRGlzcGxheSk7XG5cdFx0XHQkKCcjY29kZWJveCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHQvLyBBdCB0aGUgbW9tZW50IGtleXMgdGhhdCBhcmUgJ2hpZGRlbicgZG8gbm90IGhhdmUgYW5cblx0XHQvLyBhY3RpdmUgc3RhdGUgU28gdGhpcyBkb2VzbnQgcmVhbGx5IGRvIG11Y2ggdXNlZnVsLlxuXHRcdGlmKGlzU2hpZnRLZXkpIHtcblx0XHRcdCQoXCJrZXkuc2hmdFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHR9XG5cdH07XG5cblx0JCgnLmNvZGUtaW5uZXIuZGFyaycpLmhpZGUoKTtcblxuXHR2YXIgbGV0dGVyS2V5cyA9ICQoJy5hLC5iLC5jLC5kLC5lLC5mLC5nLC5oLC5pLC5qLC5rLC5sLC5tLC5uLC5vLC5wLC5xLC5yLC5zLC50LC51LC52LC53LC54LC55LC56LC4xLC4yLC4zLC40LC41LC42LC43LC44LC45LC4wLC50aWwsLmh5cCwuZXF1LC5sYnJhY2ssLnJicmFjaywuYnMsLmNvbCwuYXBvcywuY29tbSwuZ3JlYXQsLnF1ZXN0Jyk7XG5cblx0JC5sb2FkaW5nU3R1ZmYgPSBmdW5jdGlvbigpe1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnYXNpZGUnKS5hbmltYXRlKHtvcGFjaXR5OiAxfSk7XG5cdFx0fSwgNzUpO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnLndyYXBwZXInKS5hbmltYXRlKHtvcGFjaXR5OiAxfSk7XG5cdFx0fSwgMTUwKTtcblxuXHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdzaG93aW5nJyk7XG5cblx0fTtcblxuXHQkLmxvYWRpbmdTdHVmZigpO1xuXG5cdCQuYm9keUxvYWQgPSBmdW5jdGlvbigpe1xuXG5cdFx0JGRvY3VtZW50LnJlYWR5KGZ1bmN0aW9uKCl7XG5cblx0XHRcdGlmICgkKCdhc2lkZScpLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG5cdFx0XHRcdCQoJy53cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuc2V0dGluZ3MnKS5yZW1vdmVDbGFzcygnY2xvc2UnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCEkKCdhc2lkZScpLmhhc0NsYXNzKCdpbmFjdGl2ZScpKSB7XG5cdFx0XHRcdCQoJy53cmFwcGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuc2V0dGluZ3MnKS5hZGRDbGFzcygnY2xvc2UnKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cblx0XHQkZG9jdW1lbnQucmVhZHkoZnVuY3Rpb24oKXtcblxuXHRcdFx0aWYgKCQoJy5jYXAnKS5oYXNDbGFzcygnY2Fwc09uJykpIHtcblxuXHRcdFx0XHRsZXR0ZXJLZXlzLmFkZENsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHRcdCQoJy5jYXBzJykuYWRkQ2xhc3MoJ2FjdGl2YXRlZCcpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdCRkb2N1bWVudC5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZXYpIHtcblx0XHRcdGlmKGV2LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdGxldHRlcktleXMuYWRkQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRkb2N1bWVudC5vbihcImtleXVwXCIsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRpZighJCgnLmNhcCcpLmhhc0NsYXNzKCdjYXBzT24nKSAmJiAhZXYuc2hpZnRLZXkpIHtcblx0XHRcdFx0bGV0dGVyS2V5cy5yZW1vdmVDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLnJlbW92ZUNsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH07XG5cblx0JC5ib2R5TG9hZCgpO1xuXG5cdCQua2V5Qm9hcmQgPSBmdW5jdGlvbigpe1xuXG5cdFx0JCgnbWVudSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdHZhciBrZXlDbGFzcyA9ICQodGhpcykuYXR0cignaWQnKTtcblxuXHRcdFx0JCgnI2tleWJvYXJkJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhrZXlDbGFzcykuYWRkQ2xhc3MoJ3Nob3dpbmcnKTtcblx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhrZXlDbGFzcyk7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCk7XG5cblx0XHRcdGlmICgkKCcuY2FwJykuaGFzQ2xhc3MoJ2NhcHNPbicpKSB7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IGtleUNsYXNzfSk7XG5cblx0XHR9KTtcblxuXHRcdCQoJy5jYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG5cdFx0XHRsZXR0ZXJLZXlzLnRvZ2dsZUNsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2NhcHNPbicpO1xuXHRcdFx0JCgnLmNhcHMnKS50b2dnbGVDbGFzcygnYWN0aXZhdGVkJyk7XG5cdFx0XHQkKCcja2V5Ym9hcmQnKS50b2dnbGVDbGFzcygnY2Fwc2xvY2snKTtcblxuXHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBcIkNhcHMgTG9ja1wifSk7XG5cblx0XHR9KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9O1xuXG5cdCQua2V5Qm9hcmQoKTtcblxuXHQkLmtleUNvZGVLZXlib2FyZENvZGVzID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkLlByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCQoJ2tleScpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldil7XG5cdFx0XHRcdGRpc3BsYXlLZXkoJCh0aGlzKSwgZXYpO1xuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5LZXlQcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkZG9jdW1lbnQub24oJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuXHRcdFx0XHR2YXIga2V5ID0gJChcIltkYXRhLWtleT1cIiArIGV2LmtleUNvZGUgKyBcIl1cIik7XG5cdFx0XHRcdGRpc3BsYXlLZXkoa2V5LCBldik7XG5cdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLkRlcHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JCgna2V5Jykub24oJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcblxuXHRcdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHR2YXIgZGVwcmVzcyA9IGUud2hpY2g7XG5cblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdFx0bWl4cGFuZWwudHJhY2soXCJLZXkgQ2xpY2tlZFwiLCB7XG5cdFx0XHRcdFx0XCJLZXlcIjogJCh0aGlzKS50ZXh0KClcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuS2V5RGVwcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkZG9jdW1lbnQub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdFx0dmFyIGtleSA9ICQoXCJbZGF0YS1rZXk9XCIgKyBlLmtleUNvZGUgKyBcIl1cIik7XG5cdFx0XHRcdGtleS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHR2YXIgZGVwcmVzcyA9IGUud2hpY2g7XG5cblx0XHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdFx0bWl4cGFuZWwudHJhY2soXCJLZXkgUHJlc3NlZFwiLCB7XG5cdFx0XHRcdFx0XCJLZXlcIjoga2V5LnRleHQoKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5QcmVzcygpO1xuXHRcdCQuRGVwcmVzcygpO1xuXG5cdFx0JC5LZXlQcmVzcygpO1xuXHRcdCQuS2V5RGVwcmVzcygpO1xuXG5cdH07XG5cblx0JC5rZXlDb2RlS2V5Ym9hcmRDb2RlcygpO1xuXG5cdCQua2V5Q29tYm9zID0gZnVuY3Rpb24oKXtcblxuXHRcdCQoJy5yZWxvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHQvLyAkLmtleUNvbWJvcygpO1xuXG5cdCQubWVudU9wZW5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLnNldHRpbmdzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHQkKCcud3JhcHBlcicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoJ2luYWN0aXZlJyk7XG5cblx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjogXCJTZXR0aW5nc1wifSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5tZW51T3BlbmVyKCk7XG5cblx0JC5sb2dvQ2xpY2tlciA9IGZ1bmN0aW9uKCl7XG5cdFx0JCgnI2xvZ28nKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJyNjb2RlYm94JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXInKS5oaWRlKCk7XG5cdFx0XHQkKCcuY29kZS1pbm5lci5kYXJrJykuc2hvdygpO1xuXHRcdH0pO1xuXHRcdCQoJyNsb2dvJykub24oJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCcuY29kZS1pbm5lcicpLnNob3coKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyLmRhcmsnKS5oaWRlKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5sb2dvQ2xpY2tlcigpO1xuXG5cdCQuY29va2llTW9uc3RlciA9IGZ1bmN0aW9uKCl7XG5cblx0XHR2YXIgdHlwZUNvb2tpZSA9ICd0eXBlJyxcblx0XHRcdCAgbWVudUNvb2tpZSA9ICdtZW51Jyxcblx0XHRcdCAgY2Fwc0Nvb2tpZSA9ICdjYXAnLFxuXHRcdFx0ICBjb29raWVPcHRpb25zID0gJ2V4cGlyZXM6IDM2NSwge3BhdGg6ICcvJ30nO1xuXG5cdFx0XHQkKCcjJyArICQuY29va2llKHR5cGVDb29raWUpKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygkLmNvb2tpZSh0eXBlQ29va2llKSk7XG5cdFx0XHQkKCcjY29kZWJveCcpLmFkZENsYXNzKCQuY29va2llKHR5cGVDb29raWUpKTtcblxuXHRcdCQoJ21lbnUgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnIycgKyAkLmNvb2tpZSh0eXBlQ29va2llKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JC5jb29raWUodHlwZUNvb2tpZSwgJCh0aGlzKS5hdHRyKCdpZCcpLCBjb29raWVPcHRpb25zKTtcblx0XHRcdCQoJyMnICsgJC5jb29raWUodHlwZUNvb2tpZSkpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblxuXHRcdCQoJy5zZXR0aW5ncycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkLmNvb2tpZShtZW51Q29va2llLCAkKCdhc2lkZScpLmF0dHIoJ2NsYXNzJyksIGNvb2tpZU9wdGlvbnMpO1xuXG5cdFx0fSk7XG5cblx0XHQkKCcuY2FwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQuY29va2llKGNhcHNDb29raWUsICQodGhpcykuYXR0cignY2xhc3MnKSwgY29va2llT3B0aW9ucyk7XG5cblx0XHR9KTtcblxuXHRcdCQoJ2FzaWRlJykuYWRkQ2xhc3MoJC5jb29raWUobWVudUNvb2tpZSkpO1xuXHRcdCQoJy5jYXAnKS5hZGRDbGFzcygkLmNvb2tpZShjYXBzQ29va2llKSk7XG5cblx0fTtcblxuXHQkLmNvb2tpZU1vbnN0ZXIoKTtcblxuXHQkKCcubGlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnbGlnaHQnKTtcblx0XHQvLyBNSVhQQU5FTFxuXHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBcIlRoZW1lIC0gTGlnaHRcIn0pO1xuXHR9KTtcblxuXHQkKCcuZGFyaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdsaWdodCcpO1xuXHRcdC8vIE1JWFBBTkVMXG5cdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiVGhlbWUgLSBEYXJrXCJ9KTtcblx0fSk7XG5cblx0Ly8gQ29weSB2YWx1ZXMgdG8gdGhlIGNsaXBib2FyZFxuXHQkLmNsaXBDbGlwID0gZnVuY3Rpb24oKXtcblxuXHRcdCQoJ2tleScpLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLWFjdGlvbicsICdjb3B5JykuYXR0cignZGF0YS1jbGlwYm9hcmQtdGFyZ2V0JywgJyNjb2RlYm94IGlucHV0Jyk7XG5cdFx0dmFyIENsaXAgPSBuZXcgQ2xpcGJvYXJkKCdrZXknKTtcblxuXHR9O1xuXG5cdCQuY2xpcENsaXAoKTtcblxuXHQvLyBNSVhQQU5FTFxuXG59KTsiXX0=
