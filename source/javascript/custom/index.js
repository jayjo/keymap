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