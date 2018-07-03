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

		$('menu a').on('click', function(e){

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
			$('aside').toggleClass('inactive');

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

	$('.light').on('click', function(){
		$('body').removeClass('dark').addClass('light');
		Cookies.set(themeCookie, 'light', {cookieOptions});
		// MIXPANEL
		mixpanel.track("Clicked Something", {"Element": "Theme - Light"});
	});

	$('.dark').on('click', function(){
		$('body').removeClass('light').addClass('dark');
		Cookies.set(themeCookie, 'dark', {cookieOptions});
		// MIXPANEL
		mixpanel.track("Clicked Something", {"Element": "Theme - Dark"});
	});

	// Set Cookies
	$('body').addClass(Cookies.get(themeCookie));
	$('aside').addClass(Cookies.get(menuCookie));
	$('#keyboard, #codebox').addClass(Cookies.get(typeCookie));
	$('a#' + Cookies.get(typeCookie)).addClass('active');

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG5cdC8vIENvb2tpZSBWYXJpYWJsZXNcblx0dmFyIG1lbnVDb29raWVcdFx0XHQ9ICdtZW51Jyxcblx0XHRcdGNvb2tpZU9wdGlvbnMgXHQ9IFwiZXhwaXJlczogMzY1LCBwYXRoOiAnJ1wiLFxuXHRcdFx0dGhlbWVDb29raWVcdFx0XHQ9ICd0aGVtZScsXG5cdFx0XHR0eXBlQ29va2llXHRcdFx0PSAnY29kZSB0eXBlJztcblxuXHRkaXNwbGF5S2V5ID0gZnVuY3Rpb24oa2V5LCBldmVudCkge1xuXHRcdCQoXCJrZXkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0dmFyIGRhdGFLZXkgPSBrZXkuYXR0cignZGF0YS1rZXknKSxcblx0XHRcdFx0ZGF0YUxNVEggPSBrZXkuYXR0cignZGF0YS1sbXRoJyksXG5cdFx0XHRcdGRhdGFVbmkgPSBrZXkuYXR0cignZGF0YS11bmknKSxcblx0XHRcdFx0ZGF0YVVuaUNhcHMgPSBrZXkuYXR0cignZGF0YS11bmljYXBzJyksXG5cdFx0XHRcdGRhdGFFbmNvZGVkID0ga2V5LmF0dHIoJ2RhdGEtZW5jb2RlJyksXG5cdFx0XHRcdGRhdGFFbmNvZGVkQ2FwcyA9IGtleS5hdHRyKCdkYXRhLWVuY29kZWNhcHMnKTtcblxuXHRcdHZhciBpc1NoaWZ0S2V5ICA9IGV2ZW50LnNoaWZ0S2V5ID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRpc0NhcHNsb2NrICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCdjYXBzbG9jaycpLFxuXHRcdFx0XHRpc0NoYXJjb2RlICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCdjaGFyY29kZScpLFxuXHRcdFx0XHRpc1VuaWNvZGUgICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCd1bmljb2RlJyksXG5cdFx0XHRcdGlzVVJMRW5jb2RlID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2VuY29kZWQnKTtcblxuXHRcdHZhciBpc0NhcGl0YWxzID0gaXNDYXBzbG9jayB8fCBpc1NoaWZ0S2V5ID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdHZhciBkYXRhVG9EaXNwbGF5ID0gZmFsc2U7XG5cblx0XHRpZiAoaXNDaGFyY29kZSkge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFLZXk7XG5cblx0XHR9IGVsc2UgaWYgKCFpc0NhcGl0YWxzICYmIGlzVW5pY29kZSkge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFVbmk7XG5cblx0XHR9ICBlbHNlIGlmIChpc1VSTEVuY29kZSAmJiAhaXNDYXBpdGFscykge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFFbmNvZGVkO1xuXG5cdFx0fSBlbHNlIGlmIChpc1VuaWNvZGUgJiYgaXNDYXBpdGFscykge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFVbmlDYXBzO1xuXG5cdFx0fSBlbHNlIGlmIChpc1VSTEVuY29kZSAmJiBpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUVuY29kZWRDYXBzO1xuXHRcdH1cblxuXHRcdGlmKGRhdGFUb0Rpc3BsYXkpIHtcblx0XHRcdGtleS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdGtleS5jbGljaygpO1xuXG5cdFx0XHR2YXIgY29kZUJveCA9ICQoJyNjb2RlYm94IGlucHV0Jyk7XG5cblx0XHRcdGNvZGVCb3gudmFsKGRhdGFUb0Rpc3BsYXkpO1xuXHRcdFx0JCgnI2NvZGVib3gnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQXQgdGhlIG1vbWVudCBrZXlzIHRoYXQgYXJlICdoaWRkZW4nIGRvIG5vdCBoYXZlIGFuXG5cdFx0Ly8gYWN0aXZlIHN0YXRlIFNvIHRoaXMgZG9lc250IHJlYWxseSBkbyBtdWNoIHVzZWZ1bC5cblx0XHRpZihpc1NoaWZ0S2V5KSB7XG5cdFx0XHQkKFwia2V5LnNoZnRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0fVxuXG5cdFx0Ly8gQ2xpcGJvYXJkIGJ1c2luZXNzXG5cdFx0dmFyIGNvcHlLZXkgPSBuZXcgQ2xpcGJvYXJkSlMoJ2tleScsIHtcblx0XHRcdHRleHQ6IGZ1bmN0aW9uKHRyaWdnZXIpe1xuXHRcdFx0XHRyZXR1cm4gZGF0YVRvRGlzcGxheTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvcHlLZXkub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG5cdCAgICBjb3B5S2V5LmRlc3Ryb3koKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdCQoJy5jb2RlLWlubmVyLmRhcmsnKS5oaWRlKCk7XG5cblx0dmFyIGxldHRlcktleXMgPSAkKCcuYSwuYiwuYywuZCwuZSwuZiwuZywuaCwuaSwuaiwuaywubCwubSwubiwubywucCwucSwuciwucywudCwudSwudiwudywueCwueSwueiwuMSwuMiwuMywuNCwuNSwuNiwuNywuOCwuOSwuMCwudGlsLC5oeXAsLmVxdSwubGJyYWNrLC5yYnJhY2ssLmJzLC5jb2wsLmFwb3MsLmNvbW0sLmdyZWF0LC5xdWVzdCcpO1xuXG5cdCQubG9hZGluZ1N0dWZmID0gZnVuY3Rpb24oKXtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJ2FzaWRlJykuYW5pbWF0ZSh7b3BhY2l0eTogMX0pO1xuXHRcdH0sIDc1KTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy53cmFwcGVyJykuYW5pbWF0ZSh7b3BhY2l0eTogMX0pO1xuXHRcdH0sIDE1MCk7XG5cblx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnc2hvd2luZycpO1xuXG5cdH07XG5cblx0JC5sb2FkaW5nU3R1ZmYoKTtcblxuXHQkLmJvZHlMb2FkID0gZnVuY3Rpb24oKXtcblxuXHRcdCRkb2N1bWVudC5yZWFkeShmdW5jdGlvbigpe1xuXG5cdFx0XHRpZiAoJCgnYXNpZGUnKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuXHRcdFx0XHQkKCcud3JhcHBlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLnNldHRpbmdzJykucmVtb3ZlQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICghJCgnYXNpZGUnKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuXHRcdFx0XHQkKCcud3JhcHBlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLnNldHRpbmdzJykuYWRkQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cdFx0JGRvY3VtZW50LnJlYWR5KGZ1bmN0aW9uKCl7XG5cblx0XHRcdGlmICgkKCcuY2FwJykuaGFzQ2xhc3MoJ2NhcHNPbicpKSB7XG5cblx0XHRcdFx0bGV0dGVyS2V5cy5hZGRDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0XHQkKCcuY2FwcycpLmFkZENsYXNzKCdhY3RpdmF0ZWQnKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHQkZG9jdW1lbnQub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRpZihldi5zaGlmdEtleSkge1xuXHRcdFx0XHRsZXR0ZXJLZXlzLmFkZENsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQkZG9jdW1lbnQub24oXCJrZXl1cFwiLCBmdW5jdGlvbihldikge1xuXHRcdFx0aWYoISQoJy5jYXAnKS5oYXNDbGFzcygnY2Fwc09uJykgJiYgIWV2LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdGxldHRlcktleXMucmVtb3ZlQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5yZW1vdmVDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9O1xuXG5cdCQuYm9keUxvYWQoKTtcblxuXHQkLmtleUJvYXJkID0gZnVuY3Rpb24oKXtcblxuXHRcdCQoJ21lbnUgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHR2YXIga2V5Q2xhc3MgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cblx0XHRcdENvb2tpZXMuc2V0KHR5cGVDb29raWUsICQodGhpcykuYXR0cignaWQnKSwgY29va2llT3B0aW9ucyk7XG5cblx0XHRcdCQoJyNrZXlib2FyZCcpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moa2V5Q2xhc3MpLmFkZENsYXNzKCdzaG93aW5nJyk7XG5cdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moa2V5Q2xhc3MpO1xuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygpO1xuXG5cdFx0XHRpZiAoJCgnLmNhcCcpLmhhc0NsYXNzKCdjYXBzT24nKSkge1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBrZXlDbGFzc30pO1xuXG5cdFx0fSk7XG5cblx0XHQkKCcuY2FwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblxuXHRcdFx0bGV0dGVyS2V5cy50b2dnbGVDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjYXBzT24nKTtcblx0XHRcdCQoJy5jYXBzJykudG9nZ2xlQ2xhc3MoJ2FjdGl2YXRlZCcpO1xuXHRcdFx0JCgnI2tleWJvYXJkJykudG9nZ2xlQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cblx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRtaXhwYW5lbC50cmFjayhcIkNsaWNrZWQgU29tZXRoaW5nXCIsIHtcIkVsZW1lbnRcIjogXCJDYXBzIExvY2tcIn0pO1xuXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fTtcblxuXHQkLmtleUJvYXJkKCk7XG5cblx0JC5rZXlDb2RlS2V5Ym9hcmRDb2RlcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JC5QcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkKCdrZXknKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXYpe1xuXHRcdFx0XHRkaXNwbGF5S2V5KCQodGhpcyksIGV2KTtcblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuS2V5UHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JGRvY3VtZW50Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0dmFyIGtleSA9ICQoXCJbZGF0YS1rZXk9XCIgKyBldi5rZXlDb2RlICsgXCJdXCIpO1xuXHRcdFx0XHRkaXNwbGF5S2V5KGtleSwgZXYpO1xuXHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5EZXByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCQoJ2tleScpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0dmFyIGRlcHJlc3MgPSBlLndoaWNoO1xuXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRcdG1peHBhbmVsLnRyYWNrKFwiS2V5IENsaWNrZWRcIiwge1xuXHRcdFx0XHRcdFwiS2V5XCI6ICQodGhpcykudGV4dCgpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLktleURlcHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JGRvY3VtZW50Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuXG5cdFx0XHRcdHZhciBrZXkgPSAkKFwiW2RhdGEta2V5PVwiICsgZS5rZXlDb2RlICsgXCJdXCIpO1xuXHRcdFx0XHRrZXkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cblx0XHRcdFx0JCgnI2NvZGVib3gnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0dmFyIGRlcHJlc3MgPSBlLndoaWNoO1xuXG5cdFx0XHRcdC8vIE1JWFBBTkVMXG5cdFx0XHRcdG1peHBhbmVsLnRyYWNrKFwiS2V5IFByZXNzZWRcIiwge1xuXHRcdFx0XHRcdFwiS2V5XCI6IGtleS50ZXh0KClcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuUHJlc3MoKTtcblx0XHQkLkRlcHJlc3MoKTtcblxuXHRcdCQuS2V5UHJlc3MoKTtcblx0XHQkLktleURlcHJlc3MoKTtcblxuXHR9O1xuXG5cdCQua2V5Q29kZUtleWJvYXJkQ29kZXMoKTtcblxuXHQkLmtleUNvbWJvcyA9IGZ1bmN0aW9uKCl7XG5cblx0XHQkKCcucmVsb2FkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdH0pO1xuXG5cdH07XG5cblx0Ly8gJC5rZXlDb21ib3MoKTtcblxuXHQkLm1lbnVPcGVuZXIgPSBmdW5jdGlvbigpe1xuXHRcdCQoJy5zZXR0aW5ncycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjbG9zZScpO1xuXHRcdFx0JCgnLndyYXBwZXInKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCdhc2lkZScpLnRvZ2dsZUNsYXNzKCdpbmFjdGl2ZScpO1xuXG5cdFx0XHRDb29raWVzLnNldChtZW51Q29va2llLCAkKCdhc2lkZScpLmF0dHIoJ2NsYXNzJyksIGNvb2tpZU9wdGlvbnMpO1xuXG5cdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiU2V0dGluZ3NcIn0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQubWVudU9wZW5lcigpO1xuXG5cdCQubG9nb0NsaWNrZXIgPSBmdW5jdGlvbigpe1xuXHRcdCQoJyNsb2dvJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcjY29kZWJveCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyJykuaGlkZSgpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXIuZGFyaycpLnNob3coKTtcblx0XHR9KTtcblx0XHQkKCcjbG9nbycpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXInKS5zaG93KCk7XG5cdFx0XHQkKCcuY29kZS1pbm5lci5kYXJrJykuaGlkZSgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQubG9nb0NsaWNrZXIoKTtcblxuXHQkKCcubGlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnZGFyaycpLmFkZENsYXNzKCdsaWdodCcpO1xuXHRcdENvb2tpZXMuc2V0KHRoZW1lQ29va2llLCAnbGlnaHQnLCB7Y29va2llT3B0aW9uc30pO1xuXHRcdC8vIE1JWFBBTkVMXG5cdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiVGhlbWUgLSBMaWdodFwifSk7XG5cdH0pO1xuXG5cdCQoJy5kYXJrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xpZ2h0JykuYWRkQ2xhc3MoJ2RhcmsnKTtcblx0XHRDb29raWVzLnNldCh0aGVtZUNvb2tpZSwgJ2RhcmsnLCB7Y29va2llT3B0aW9uc30pO1xuXHRcdC8vIE1JWFBBTkVMXG5cdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiVGhlbWUgLSBEYXJrXCJ9KTtcblx0fSk7XG5cblx0Ly8gU2V0IENvb2tpZXNcblx0JCgnYm9keScpLmFkZENsYXNzKENvb2tpZXMuZ2V0KHRoZW1lQ29va2llKSk7XG5cdCQoJ2FzaWRlJykuYWRkQ2xhc3MoQ29va2llcy5nZXQobWVudUNvb2tpZSkpO1xuXHQkKCcja2V5Ym9hcmQsICNjb2RlYm94JykuYWRkQ2xhc3MoQ29va2llcy5nZXQodHlwZUNvb2tpZSkpO1xuXHQkKCdhIycgKyBDb29raWVzLmdldCh0eXBlQ29va2llKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG59KTsiXX0=
