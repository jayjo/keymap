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
	$('aside').addClass(Cookies.get(menuCookie));
	$('#keyboard, #codebox').addClass(Cookies.get(typeCookie));
	$('a#' + Cookies.get(typeCookie)).addClass('active');

});
jQuery(document).ready(function($) {
  // Draggable Menu
  $('#keypad').draggable();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwia2V5cGFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6VEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG5cdC8vIENvb2tpZSBWYXJpYWJsZXNcblx0dmFyIG1lbnVDb29raWVcdFx0XHQ9ICdtZW51Jyxcblx0XHRcdGNvb2tpZU9wdGlvbnMgXHQ9IFwiZXhwaXJlczogMzY1LCBwYXRoOiAnJ1wiLFxuXHRcdFx0dGhlbWVDb29raWVcdFx0XHQ9ICd0aGVtZScsXG5cdFx0XHR0eXBlQ29va2llXHRcdFx0PSAnY29kZSB0eXBlJztcblxuXHRkaXNwbGF5S2V5ID0gZnVuY3Rpb24oa2V5LCBldmVudCkge1xuXHRcdCQoXCJrZXkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0dmFyIGRhdGFLZXkgPSBrZXkuYXR0cignZGF0YS1rZXknKSxcblx0XHRcdFx0ZGF0YUxNVEggPSBrZXkuYXR0cignZGF0YS1sbXRoJyksXG5cdFx0XHRcdGRhdGFVbmkgPSBrZXkuYXR0cignZGF0YS11bmknKSxcblx0XHRcdFx0ZGF0YVVuaUNhcHMgPSBrZXkuYXR0cignZGF0YS11bmljYXBzJyksXG5cdFx0XHRcdGRhdGFFbmNvZGVkID0ga2V5LmF0dHIoJ2RhdGEtZW5jb2RlJyksXG5cdFx0XHRcdGRhdGFFbmNvZGVkQ2FwcyA9IGtleS5hdHRyKCdkYXRhLWVuY29kZWNhcHMnKTtcblxuXHRcdHZhciBpc1NoaWZ0S2V5ICA9IGV2ZW50LnNoaWZ0S2V5ID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRpc0NhcHNsb2NrICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCdjYXBzbG9jaycpLFxuXHRcdFx0XHRpc0NoYXJjb2RlICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCdjaGFyY29kZScpLFxuXHRcdFx0XHRpc1VuaWNvZGUgICA9ICQoJyNrZXlib2FyZCcpLmhhc0NsYXNzKCd1bmljb2RlJyksXG5cdFx0XHRcdGlzVVJMRW5jb2RlID0gJCgnI2tleWJvYXJkJykuaGFzQ2xhc3MoJ2VuY29kZWQnKTtcblxuXHRcdHZhciBpc0NhcGl0YWxzID0gaXNDYXBzbG9jayB8fCBpc1NoaWZ0S2V5ID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdHZhciBkYXRhVG9EaXNwbGF5ID0gZmFsc2U7XG5cblx0XHRpZiAoaXNDaGFyY29kZSkge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFLZXk7XG5cblx0XHR9IGVsc2UgaWYgKCFpc0NhcGl0YWxzICYmIGlzVW5pY29kZSkge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFVbmk7XG5cblx0XHR9ICBlbHNlIGlmIChpc1VSTEVuY29kZSAmJiAhaXNDYXBpdGFscykge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFFbmNvZGVkO1xuXG5cdFx0fSBlbHNlIGlmIChpc1VuaWNvZGUgJiYgaXNDYXBpdGFscykge1xuXHRcdFx0ZGF0YVRvRGlzcGxheSA9IGRhdGFVbmlDYXBzO1xuXG5cdFx0fSBlbHNlIGlmIChpc1VSTEVuY29kZSAmJiBpc0NhcGl0YWxzKSB7XG5cdFx0XHRkYXRhVG9EaXNwbGF5ID0gZGF0YUVuY29kZWRDYXBzO1xuXHRcdH1cblxuXHRcdGlmKGRhdGFUb0Rpc3BsYXkpIHtcblx0XHRcdGtleS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdGtleS5jbGljaygpO1xuXG5cdFx0XHR2YXIgY29kZUJveCA9ICQoJyNjb2RlYm94IGlucHV0Jyk7XG5cblx0XHRcdGNvZGVCb3gudmFsKGRhdGFUb0Rpc3BsYXkpO1xuXHRcdFx0JCgnI2NvZGVib3gnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQXQgdGhlIG1vbWVudCBrZXlzIHRoYXQgYXJlICdoaWRkZW4nIGRvIG5vdCBoYXZlIGFuXG5cdFx0Ly8gYWN0aXZlIHN0YXRlIFNvIHRoaXMgZG9lc250IHJlYWxseSBkbyBtdWNoIHVzZWZ1bC5cblx0XHRpZihpc1NoaWZ0S2V5KSB7XG5cdFx0XHQkKFwia2V5LnNoZnRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0fVxuXG5cdFx0Ly8gQ2xpcGJvYXJkIGJ1c2luZXNzXG5cdFx0dmFyIGNvcHlLZXkgPSBuZXcgQ2xpcGJvYXJkSlMoJ2tleScsIHtcblx0XHRcdHRleHQ6IGZ1bmN0aW9uKHRyaWdnZXIpe1xuXHRcdFx0XHRyZXR1cm4gZGF0YVRvRGlzcGxheTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvcHlLZXkub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG5cdCAgICBjb3B5S2V5LmRlc3Ryb3koKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdCQoJy5jb2RlLWlubmVyLmRhcmsnKS5oaWRlKCk7XG5cblx0dmFyIGxldHRlcktleXMgPSAkKCcuYSwuYiwuYywuZCwuZSwuZiwuZywuaCwuaSwuaiwuaywubCwubSwubiwubywucCwucSwuciwucywudCwudSwudiwudywueCwueSwueiwuMSwuMiwuMywuNCwuNSwuNiwuNywuOCwuOSwuMCwudGlsLC5oeXAsLmVxdSwubGJyYWNrLC5yYnJhY2ssLmJzLC5jb2wsLmFwb3MsLmNvbW0sLmdyZWF0LC5xdWVzdCcpO1xuXG5cdCQubG9hZGluZ1N0dWZmID0gZnVuY3Rpb24oKXtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJ2FzaWRlJykuYW5pbWF0ZSh7b3BhY2l0eTogMX0pO1xuXHRcdH0sIDc1KTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCQoJy53cmFwcGVyJykuYW5pbWF0ZSh7b3BhY2l0eTogMX0pO1xuXHRcdH0sIDE1MCk7XG5cblx0XHQkKCcja2V5Ym9hcmQnKS5hZGRDbGFzcygnc2hvd2luZycpO1xuXG5cdH07XG5cblx0JC5sb2FkaW5nU3R1ZmYoKTtcblxuXHQkLmJvZHlMb2FkID0gZnVuY3Rpb24oKXtcblxuXHRcdCRkb2N1bWVudC5yZWFkeShmdW5jdGlvbigpe1xuXG5cdFx0XHRpZiAoJCgnYXNpZGUnKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuXHRcdFx0XHQkKCcud3JhcHBlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLnNldHRpbmdzJykucmVtb3ZlQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICghJCgnYXNpZGUnKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuXHRcdFx0XHQkKCcud3JhcHBlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLnNldHRpbmdzJykuYWRkQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cdFx0JGRvY3VtZW50LnJlYWR5KGZ1bmN0aW9uKCl7XG5cblx0XHRcdGlmICgkKCcuY2FwJykuaGFzQ2xhc3MoJ2NhcHNPbicpKSB7XG5cblx0XHRcdFx0bGV0dGVyS2V5cy5hZGRDbGFzcygndXBwZXJjYXNlJyk7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0XHQkKCcuY2FwcycpLmFkZENsYXNzKCdhY3RpdmF0ZWQnKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHQkZG9jdW1lbnQub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRpZihldi5zaGlmdEtleSkge1xuXHRcdFx0XHRsZXR0ZXJLZXlzLmFkZENsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdFx0JCgnI2tleWJvYXJkJykuYWRkQ2xhc3MoJ2NhcHNsb2NrJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQkZG9jdW1lbnQub24oXCJrZXl1cFwiLCBmdW5jdGlvbihldikge1xuXHRcdFx0aWYoISQoJy5jYXAnKS5oYXNDbGFzcygnY2Fwc09uJykgJiYgIWV2LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdGxldHRlcktleXMucmVtb3ZlQ2xhc3MoJ3VwcGVyY2FzZScpO1xuXHRcdFx0XHQkKCcja2V5Ym9hcmQnKS5yZW1vdmVDbGFzcygnY2Fwc2xvY2snKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9O1xuXG5cdCQuYm9keUxvYWQoKTtcblxuXHQkLmtleUJvYXJkID0gZnVuY3Rpb24oKXtcblxuXHRcdCQoJy5jb2RldHlwZSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdHZhciBrZXlDbGFzcyA9ICQodGhpcykuYXR0cignaWQnKTtcblxuXHRcdFx0Q29va2llcy5zZXQodHlwZUNvb2tpZSwgJCh0aGlzKS5hdHRyKCdpZCcpLCBjb29raWVPcHRpb25zKTtcblxuXHRcdFx0JCgnI2tleWJvYXJkJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhrZXlDbGFzcykuYWRkQ2xhc3MoJ3Nob3dpbmcnKTtcblx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhrZXlDbGFzcyk7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCk7XG5cblx0XHRcdGlmICgkKCcuY2FwJykuaGFzQ2xhc3MoJ2NhcHNPbicpKSB7XG5cdFx0XHRcdCQoJyNrZXlib2FyZCcpLmFkZENsYXNzKCdjYXBzbG9jaycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IGtleUNsYXNzfSk7XG5cblx0XHR9KTtcblxuXHRcdCQoJy5jYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG5cdFx0XHRsZXR0ZXJLZXlzLnRvZ2dsZUNsYXNzKCd1cHBlcmNhc2UnKTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2NhcHNPbicpO1xuXHRcdFx0JCgnLmNhcHMnKS50b2dnbGVDbGFzcygnYWN0aXZhdGVkJyk7XG5cdFx0XHQkKCcja2V5Ym9hcmQnKS50b2dnbGVDbGFzcygnY2Fwc2xvY2snKTtcblxuXHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdG1peHBhbmVsLnRyYWNrKFwiQ2xpY2tlZCBTb21ldGhpbmdcIiwge1wiRWxlbWVudFwiOiBcIkNhcHMgTG9ja1wifSk7XG5cblx0XHR9KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9O1xuXG5cdCQua2V5Qm9hcmQoKTtcblxuXHQkLmtleUNvZGVLZXlib2FyZENvZGVzID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkLlByZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdCQoJ2tleScpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldil7XG5cdFx0XHRcdGRpc3BsYXlLZXkoJCh0aGlzKSwgZXYpO1xuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5LZXlQcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkZG9jdW1lbnQub24oJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuXHRcdFx0XHR2YXIga2V5ID0gJChcIltkYXRhLWtleT1cIiArIGV2LmtleUNvZGUgKyBcIl1cIik7XG5cdFx0XHRcdGRpc3BsYXlLZXkoa2V5LCBldik7XG5cdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdH07XG5cblx0XHQkLkRlcHJlc3MgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JCgna2V5Jykub24oJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcblxuXHRcdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHR2YXIgZGVwcmVzcyA9IGUud2hpY2g7XG5cblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdFx0bWl4cGFuZWwudHJhY2soXCJLZXkgQ2xpY2tlZFwiLCB7XG5cdFx0XHRcdFx0XCJLZXlcIjogJCh0aGlzKS50ZXh0KClcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdCQuS2V5RGVwcmVzcyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkZG9jdW1lbnQub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG5cblx0XHRcdFx0dmFyIGtleSA9ICQoXCJbZGF0YS1rZXk9XCIgKyBlLmtleUNvZGUgKyBcIl1cIik7XG5cdFx0XHRcdGtleS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdFx0XHQkKCcjY29kZWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHR2YXIgZGVwcmVzcyA9IGUud2hpY2g7XG5cblx0XHRcdFx0Ly8gTUlYUEFORUxcblx0XHRcdFx0bWl4cGFuZWwudHJhY2soXCJLZXkgUHJlc3NlZFwiLCB7XG5cdFx0XHRcdFx0XCJLZXlcIjoga2V5LnRleHQoKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cblx0XHR9O1xuXG5cdFx0JC5QcmVzcygpO1xuXHRcdCQuRGVwcmVzcygpO1xuXG5cdFx0JC5LZXlQcmVzcygpO1xuXHRcdCQuS2V5RGVwcmVzcygpO1xuXG5cdH07XG5cblx0JC5rZXlDb2RlS2V5Ym9hcmRDb2RlcygpO1xuXG5cdCQua2V5Q29tYm9zID0gZnVuY3Rpb24oKXtcblxuXHRcdCQoJy5yZWxvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHQvLyAkLmtleUNvbWJvcygpO1xuXG5cdCQubWVudU9wZW5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0JCgnLnNldHRpbmdzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2Nsb3NlJyk7XG5cdFx0XHQkKCcud3JhcHBlcicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJ2FzaWRlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHRDb29raWVzLnNldChtZW51Q29va2llLCAkKCdhc2lkZScpLmF0dHIoJ2NsYXNzJyksIGNvb2tpZU9wdGlvbnMpO1xuXG5cdFx0XHQvLyBNSVhQQU5FTFxuXHRcdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiU2V0dGluZ3NcIn0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQubWVudU9wZW5lcigpO1xuXG5cdCQubG9nb0NsaWNrZXIgPSBmdW5jdGlvbigpe1xuXHRcdCQoJyNsb2dvJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcjY29kZWJveCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJy5jb2RlLWlubmVyJykuaGlkZSgpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXIuZGFyaycpLnNob3coKTtcblx0XHR9KTtcblx0XHQkKCcjbG9nbycpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJyNjb2RlYm94JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCgnLmNvZGUtaW5uZXInKS5zaG93KCk7XG5cdFx0XHQkKCcuY29kZS1pbm5lci5kYXJrJykuaGlkZSgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQubG9nb0NsaWNrZXIoKTtcblxuXHQkKCdtZW51LnRoZW1lIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHZhciB0aGVtZVRleHQgPSAkKHRoaXMpLnRleHQoKSxcblx0XHRcdFx0dGhlbWUgXHRcdD0gJCh0aGlzKS5hdHRyKCdjbGFzcycpO1xuXHRcdCQoJy50aGVtZS1zd2l0Y2hlcicpLnRleHQodGhlbWVUZXh0KTtcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGVtZSk7XG5cdFx0Q29va2llcy5zZXQodGhlbWVDb29raWUsIHRoZW1lLCB7Y29va2llT3B0aW9uc30pO1xuXHRcdCQoJ21lbnUudGhlbWUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdC8vIE1JWFBBTkVMXG5cdFx0bWl4cGFuZWwudHJhY2soXCJDbGlja2VkIFNvbWV0aGluZ1wiLCB7XCJFbGVtZW50XCI6IFwiVGhlbWUgLSBcIiArIHRoZW1lfSk7XG5cdH0pO1xuXG5cdCQoJy50aGVtZS1zd2l0Y2hlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnbWVudS50aGVtZScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdH0pO1xuXG5cdC8vIFNldCBDb29raWVzXG5cdCQoJ2JvZHknKS5hZGRDbGFzcyhDb29raWVzLmdldCh0aGVtZUNvb2tpZSkpO1xuXHQkKCcudGhlbWUtc3dpdGNoZXInKS50ZXh0KENvb2tpZXMuZ2V0KHRoZW1lQ29va2llKSk7XG5cdCQoJ2FzaWRlJykuYWRkQ2xhc3MoQ29va2llcy5nZXQobWVudUNvb2tpZSkpO1xuXHQkKCcja2V5Ym9hcmQsICNjb2RlYm94JykuYWRkQ2xhc3MoQ29va2llcy5nZXQodHlwZUNvb2tpZSkpO1xuXHQkKCdhIycgKyBDb29raWVzLmdldCh0eXBlQ29va2llKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG59KTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgLy8gRHJhZ2dhYmxlIE1lbnVcbiAgJCgnI2tleXBhZCcpLmRyYWdnYWJsZSgpO1xufSk7Il19
