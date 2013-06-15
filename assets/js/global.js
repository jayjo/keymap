jQuery(document).ready(function($) {

	$.keyCodeKeyboardCodes = function() {

		$.Press = function() {

			$('body').on('keydown', function(e){

				$('#codebox').addClass('active');

				var press = e.which;

				if (press === 27) {
					e.preventDefault();
					$('.esc').addClass('active').siblings().removeClass('active');
				} else if (press === 112) {
					e.preventDefault();
					$('.f1').addClass('active').siblings().removeClass('active');
				} else if (press === 113) {
					e.preventDefault();
					$('.f2').addClass('active').siblings().removeClass('active');
				} else if (press === 114) {
					e.preventDefault();
					$('.f3').addClass('active').siblings().removeClass('active');
				} else if (press === 115) {
					e.preventDefault();
					$('.f4').addClass('active').siblings().removeClass('active');
				} else if (press === 116) {
					e.preventDefault();
					$('.f5').addClass('active').siblings().removeClass('active');
				} else if (press === 117) {
					e.preventDefault();
					$('.f6').addClass('active').siblings().removeClass('active');
				} else if (press === 118) {
					e.preventDefault();
					$('.f7').addClass('active').siblings().removeClass('active');
				} else if (press === 119) {
					e.preventDefault();
					$('.f8').addClass('active').siblings().removeClass('active');
				} else if (press === 120) {
					e.preventDefault();
					$('.f9').addClass('active').siblings().removeClass('active');
				} else if (press === 121) {
					e.preventDefault();
					$('.f10').addClass('active').siblings().removeClass('active');
				} else if (press === 122) {
					e.preventDefault();
					$('.f11').addClass('active').siblings().removeClass('active');
				} else if (press === 123) {
					e.preventDefault();
					$('.f12').addClass('active').siblings().removeClass('active');
				} else if (press === 192) {
					e.preventDefault();
					$('.til').addClass('active').siblings().removeClass('active');
				} else if (press === 49) {
					e.preventDefault();
					$('.1').addClass('active').siblings().removeClass('active');
				} else if (press === 50) {
					e.preventDefault();
					$('.2').addClass('active').siblings().removeClass('active');
				} else if (press === 51) {
					e.preventDefault();
					$('.3').addClass('active').siblings().removeClass('active');
				} else if (press === 52) {
					e.preventDefault();
					$('.4').addClass('active').siblings().removeClass('active');
				} else if (press === 53) {
					e.preventDefault();
					$('.5').addClass('active').siblings().removeClass('active');
				} else if (press === 54) {
					e.preventDefault();
					$('.6').addClass('active').siblings().removeClass('active');
				} else if (press === 55) {
					e.preventDefault();
					$('.7').addClass('active').siblings().removeClass('active');
				} else if (press === 56) {
					e.preventDefault();
					$('.8').addClass('active').siblings().removeClass('active');
				} else if (press === 57) {
					e.preventDefault();
					$('.9').addClass('active').siblings().removeClass('active');
				} else if (press === 48) {
					e.preventDefault();
					$('.0').addClass('active').siblings().removeClass('active');
				} else if (press === 189) {
					e.preventDefault();
					$('.hyp').addClass('active').siblings().removeClass('active');
				} else if (press === 187) {
					e.preventDefault();
					$('.equ').addClass('active').siblings().removeClass('active');
				} else if (press === 8) {
					e.preventDefault();
					$('.delete').addClass('active').siblings().removeClass('active');
				} else if (press === 9) {
					e.preventDefault();
					$('.tab').addClass('active').siblings().removeClass('active');
				} else if (press === 81) {
					e.preventDefault();
					$('.q').addClass('active').siblings().removeClass('active');
				} else if (press === 87) {
					e.preventDefault();
					$('.w').addClass('active').siblings().removeClass('active');
				} else if (press === 69) {
					e.preventDefault();
					$('.e').addClass('active').siblings().removeClass('active');
				} else if (press === 82) {
					e.preventDefault();
					$('.r').addClass('active').siblings().removeClass('active');
				} else if (press === 84) {
					e.preventDefault();
					$('.t').addClass('active').siblings().removeClass('active');
				} else if (press === 89) {
					e.preventDefault();
					$('.y').addClass('active').siblings().removeClass('active');
				} else if (press === 85) {
					e.preventDefault();
					$('.u').addClass('active').siblings().removeClass('active');
				} else if (press === 73) {
					e.preventDefault();
					$('.i').addClass('active').siblings().removeClass('active');
				} else if (press === 79) {
					e.preventDefault();
					$('.o').addClass('active').siblings().removeClass('active');
				} else if (press === 80) {
					e.preventDefault();
					$('.p').addClass('active').siblings().removeClass('active');
				} else if (press === 219) {
					e.preventDefault();
					$('.lbrack').addClass('active').siblings().removeClass('active');
				} else if (press === 221) {
					e.preventDefault();
					$('.rbrack').addClass('active').siblings().removeClass('active');
				} else if (press === 220) {
					e.preventDefault();
					$('.bs').addClass('active').siblings().removeClass('active');
				}



				else if (press === 20) {
					e.preventDefault();
					$('.caps').addClass('active').siblings().removeClass('active');
				} else if (press === 65) {
					e.preventDefault();
					$('.a').addClass('active').siblings().removeClass('active');
				} else if (press === 83) {
					e.preventDefault();
					$('.s').addClass('active').siblings().removeClass('active');
				} else if (press === 68) {
					e.preventDefault();
					$('.d').addClass('active').siblings().removeClass('active');
				} else if (press === 70) {
					e.preventDefault();
					$('.f').addClass('active').siblings().removeClass('active');
				} else if (press === 71) {
					e.preventDefault();
					$('.g').addClass('active').siblings().removeClass('active');
				} else if (press === 72) {
					e.preventDefault();
					$('.h').addClass('active').siblings().removeClass('active');
				} else if (press === 74) {
					e.preventDefault();
					$('.j').addClass('active').siblings().removeClass('active');
				} else if (press === 75) {
					e.preventDefault();
					$('.k').addClass('active').siblings().removeClass('active');
				} else if (press === 76) {
					e.preventDefault();
					$('.l').addClass('active').siblings().removeClass('active');
				} else if (press === 186) {
					e.preventDefault();
					$('.col').addClass('active').siblings().removeClass('active');
				} else if (press === 222) {
					e.preventDefault();
					$('.apos').addClass('active').siblings().removeClass('active');
				} else if (press === 13) {
					e.preventDefault();
					$('.return').addClass('active').siblings().removeClass('active');
				} else if (press === 90) {
					e.preventDefault();
					$('.z').addClass('active').siblings().removeClass('active');
				} else if (press === 88) {
					e.preventDefault();
					$('.x').addClass('active').siblings().removeClass('active');
				} else if (press === 67) {
					e.preventDefault();
					$('.c').addClass('active').siblings().removeClass('active');
				} else if (press === 86) {
					e.preventDefault();
					$('.v').addClass('active').siblings().removeClass('active');
				} else if (press === 66) {
					e.preventDefault();
					$('.b').addClass('active').siblings().removeClass('active');
				} else if (press === 78) {
					e.preventDefault();
					$('.n').addClass('active').siblings().removeClass('active');
				} else if (press === 77) {
					e.preventDefault();
					$('.m').addClass('active').siblings().removeClass('active');
				} else if (press === 188) {
					e.preventDefault();
					$('.comm').addClass('active').siblings().removeClass('active');
				} else if (press === 190) {
					e.preventDefault();
					$('.great').addClass('active').siblings().removeClass('active');
				} else if (press === 191) {
					e.preventDefault();
					$('.quest').addClass('active').siblings().removeClass('active');
				} else if (press === 16) {
					e.preventDefault();
					$('.shft').addClass('active');
					$('key').not('.shft').removeClass('active');
				}


				else if (press === 220) {
					e.preventDefault();
					$('.bs').addClass('active').siblings().removeClass('active');
				}

			});

		};

		$.Depress = function() {

			$('body').on('keyup', function(e){

				$('#codebox').removeClass('active');

				var depress = e.which;

				if (depress === 27) {
					e.preventDefault();
					$('.esc').removeClass('active');
				} else if (depress === 112) {
					e.preventDefault();
					$('.f1').removeClass('active');
				} else if (depress === 113) {
					e.preventDefault();
					$('.f2').removeClass('active');
				} else if (depress === 114) {
					e.preventDefault();
					$('.f3').removeClass('active');
				} else if (depress === 115) {
					e.preventDefault();
					$('.f4').removeClass('active');
				} else if (depress === 116) {
					e.preventDefault();
					$('.f5').removeClass('active');
				} else if (depress === 117) {
					e.preventDefault();
					$('.f6').removeClass('active');
				} else if (depress === 118) {
					e.preventDefault();
					$('.f7').removeClass('active');
				} else if (depress === 119) {
					e.preventDefault();
					$('.f8').removeClass('active');
				} else if (depress === 120) {
					e.preventDefault();
					$('.f9').removeClass('active');
				} else if (depress === 121) {
					e.preventDefault();
					$('.f10').removeClass('active');
				} else if (depress === 122) {
					e.preventDefault();
					$('.f11').removeClass('active');
				} else if (depress === 123) {
					e.preventDefault();
					$('.f12').removeClass('active');
				} else if (depress === 192) {
					e.preventDefault();
					$('.til').removeClass('active');
				} else if (depress === 49) {
					e.preventDefault();
					$('.1').removeClass('active');
				} else if (depress === 50) {
					e.preventDefault();
					$('.2').removeClass('active');
				} else if (depress === 51) {
					e.preventDefault();
					$('.3').removeClass('active');
				} else if (depress === 52) {
					e.preventDefault();
					$('.4').removeClass('active');
				} else if (depress === 53) {
					e.preventDefault();
					$('.5').removeClass('active');
				} else if (depress === 54) {
					e.preventDefault();
					$('.6').removeClass('active');
				} else if (depress === 55) {
					e.preventDefault();
					$('.7').removeClass('active');
				} else if (depress === 56) {
					e.preventDefault();
					$('.8').removeClass('active');
				} else if (depress === 57) {
					e.preventDefault();
					$('.9').removeClass('active');
				} else if (depress === 48) {
					e.preventDefault();
					$('.0').removeClass('active');
				} else if (depress === 189) {
					e.preventDefault();
					$('.hyp').removeClass('active');
				} else if (depress === 187) {
					e.preventDefault();
					$('.equ').removeClass('active');
				} else if (depress === 8) {
					e.preventDefault();
					$('.delete').removeClass('active');
				} else if (depress === 9) {
					e.preventDefault();
					$('.tab').removeClass('active');
				} else if (depress === 81) {
					e.preventDefault();
					$('.q').removeClass('active');
				} else if (depress === 87) {
					e.preventDefault();
					$('.w').removeClass('active');
				} else if (depress === 69) {
					e.preventDefault();
					$('.e').removeClass('active');
				} else if (depress === 82) {
					e.preventDefault();
					$('.r').removeClass('active');
				} else if (depress === 84) {
					e.preventDefault();
					$('.t').removeClass('active');
				} else if (depress === 89) {
					e.preventDefault();
					$('.y').removeClass('active');
				} else if (depress === 85) {
					e.preventDefault();
					$('.u').removeClass('active');
				} else if (depress === 73) {
					e.preventDefault();
					$('.i').removeClass('active');
				} else if (depress === 79) {
					e.preventDefault();
					$('.o').removeClass('active');
				} else if (depress === 80) {
					e.preventDefault();
					$('.p').removeClass('active');
				} else if (depress === 219) {
					e.preventDefault();
					$('.lbrack').removeClass('active');
				} else if (depress === 221) {
					e.preventDefault();
					$('.rbrack').removeClass('active');
				} else if (depress === 220) {
					e.preventDefault();
					$('.bs').removeClass('active');
				}



				else if (depress === 20) {
					e.preventDefault();
					$('.caps').removeClass('active');
				} else if (depress === 65) {
					e.preventDefault();
					$('.a').removeClass('active');
				} else if (depress === 83) {
					e.preventDefault();
					$('.s').removeClass('active');
				} else if (depress === 68) {
					e.preventDefault();
					$('.d').removeClass('active');
				} else if (depress === 70) {
					e.preventDefault();
					$('.f').removeClass('active');
				} else if (depress === 71) {
					e.preventDefault();
					$('.g').removeClass('active');
				} else if (depress === 72) {
					e.preventDefault();
					$('.h').removeClass('active');
				} else if (depress === 74) {
					e.preventDefault();
					$('.j').removeClass('active');
				} else if (depress === 75) {
					e.preventDefault();
					$('.k').removeClass('active');
				} else if (depress === 76) {
					e.preventDefault();
					$('.l').removeClass('active');
				} else if (depress === 186) {
					e.preventDefault();
					$('.col').removeClass('active');
				} else if (depress === 222) {
					e.preventDefault();
					$('.apos').removeClass('active');
				} else if (depress === 13) {
					e.preventDefault();
					$('.return').removeClass('active');
				} else if (depress === 90) {
					e.preventDefault();
					$('.z').removeClass('active');
				} else if (depress === 88) {
					e.preventDefault();
					$('.x').removeClass('active');
				} else if (depress === 67) {
					e.preventDefault();
					$('.c').removeClass('active');
				} else if (depress === 86) {
					e.preventDefault();
					$('.v').removeClass('active');
				} else if (depress === 66) {
					e.preventDefault();
					$('.b').removeClass('active');
				} else if (depress === 78) {
					e.preventDefault();
					$('.n').removeClass('active');
				} else if (depress === 77) {
					e.preventDefault();
					$('.m').removeClass('active');
				} else if (depress === 188) {
					e.preventDefault();
					$('.comm').removeClass('active');
				} else if (depress === 190) {
					e.preventDefault();
					$('.great').removeClass('active');
				} else if (depress === 191) {
					e.preventDefault();
					$('.quest').removeClass('active');
				} else if (depress === 16) {
					e.preventDefault();
					$('.shft').removeClass('active');
					$('key').not('.shft').removeClass('active');
				}


				else if (depress === 220) {
					e.preventDefault();
					$('.bs').removeClass('active');
				}

			});

		};

		$.Press();
		$.Depress();

	};

	$.keyCombos = function(){

		$('.reload').on('click', function(){
			location.reload();
		});

	};

	$.keyCombos();
	$.keyCodeKeyboardCodes();
	
});