jQuery(document).ready(function($) {

	$.keyCodeKeyboardCodes = function() {

		$.Press = function() {

			$('body').on('keydown', function(e){

				var p = e.which;

				if (p === 27) {
					e.preventDefault();
					$('.esc').addClass('active').siblings().removeClass('active');
				} else if (p === 112) {
					e.preventDefault();
					$('.f1').addClass('active').siblings().removeClass('active');
				} else if (p === 113) {
					e.preventDefault();
					$('.f2').addClass('active').siblings().removeClass('active');
				} else if (p === 114) {
					e.preventDefault();
					$('.f3').addClass('active').siblings().removeClass('active');
				} else if (p === 115) {
					e.preventDefault();
					$('.f4').addClass('active').siblings().removeClass('active');
				} else if (p === 116) {
					e.preventDefault();
					$('.f5').addClass('active').siblings().removeClass('active');
				} else if (p === 117) {
					e.preventDefault();
					$('.f6').addClass('active').siblings().removeClass('active');
				} else if (p === 118) {
					e.preventDefault();
					$('.f7').addClass('active').siblings().removeClass('active');
				} else if (p === 119) {
					e.preventDefault();
					$('.f8').addClass('active').siblings().removeClass('active');
				} else if (p === 120) {
					e.preventDefault();
					$('.f9').addClass('active').siblings().removeClass('active');
				} else if (p === 121) {
					e.preventDefault();
					$('.f10').addClass('active').siblings().removeClass('active');
				} else if (p === 122) {
					e.preventDefault();
					$('.f11').addClass('active').siblings().removeClass('active');
				} else if (p === 123) {
					e.preventDefault();
					$('.f12').addClass('active').siblings().removeClass('active');
				} else if (p === 192) {
					e.preventDefault();
					$('.til').addClass('active').siblings().removeClass('active');
				} else if (p === 49) {
					e.preventDefault();
					$('.1').addClass('active').siblings().removeClass('active');
				} else if (p === 50) {
					e.preventDefault();
					$('.2').addClass('active').siblings().removeClass('active');
				} else if (p === 51) {
					e.preventDefault();
					$('.3').addClass('active').siblings().removeClass('active');
				} else if (p === 52) {
					e.preventDefault();
					$('.4').addClass('active').siblings().removeClass('active');
				} else if (p === 53) {
					e.preventDefault();
					$('.5').addClass('active').siblings().removeClass('active');
				} else if (p === 54) {
					e.preventDefault();
					$('.6').addClass('active').siblings().removeClass('active');
				} else if (p === 55) {
					e.preventDefault();
					$('.7').addClass('active').siblings().removeClass('active');
				} else if (p === 56) {
					e.preventDefault();
					$('.8').addClass('active').siblings().removeClass('active');
				} else if (p === 57) {
					e.preventDefault();
					$('.9').addClass('active').siblings().removeClass('active');
				} else if (p === 48) {
					e.preventDefault();
					$('.0').addClass('active').siblings().removeClass('active');
				} else if (p === 189) {
					e.preventDefault();
					$('.hyp').addClass('active').siblings().removeClass('active');
				} else if (p === 187) {
					e.preventDefault();
					$('.equ').addClass('active').siblings().removeClass('active');
				} else if (p === 8) {
					e.preventDefault();
					$('.delete').addClass('active').siblings().removeClass('active');
				} else if (p === 9) {
					e.preventDefault();
					$('.tab').addClass('active').siblings().removeClass('active');
				} else if (p === 81) {
					e.preventDefault();
					$('.q').addClass('active').siblings().removeClass('active');
				} else if (p === 87) {
					e.preventDefault();
					$('.w').addClass('active').siblings().removeClass('active');
				} else if (p === 69) {
					e.preventDefault();
					$('.e').addClass('active').siblings().removeClass('active');
				} else if (p === 82) {
					e.preventDefault();
					$('.r').addClass('active').siblings().removeClass('active');
				} else if (p === 84) {
					e.preventDefault();
					$('.t').addClass('active').siblings().removeClass('active');
				} else if (p === 89) {
					e.preventDefault();
					$('.y').addClass('active').siblings().removeClass('active');
				} else if (p === 85) {
					e.preventDefault();
					$('.u').addClass('active').siblings().removeClass('active');
				} else if (p === 73) {
					e.preventDefault();
					$('.i').addClass('active').siblings().removeClass('active');
				} else if (p === 79) {
					e.preventDefault();
					$('.o').addClass('active').siblings().removeClass('active');
				} else if (p === 80) {
					e.preventDefault();
					$('.p').addClass('active').siblings().removeClass('active');
				} else if (p === 219) {
					e.preventDefault();
					$('.lbrack').addClass('active').siblings().removeClass('active');
				} else if (p === 221) {
					e.preventDefault();
					$('.rbrack').addClass('active').siblings().removeClass('active');
				} else if (p === 220) {
					e.preventDefault();
					$('.bs').addClass('active').siblings().removeClass('active');
				}



				else if (p === 20) {
					e.preventDefault();
					$('.caps').addClass('active').siblings().removeClass('active');
				} else if (p === 65) {
					e.preventDefault();
					$('.a').addClass('active').siblings().removeClass('active');
				} else if (p === 83) {
					e.preventDefault();
					$('.s').addClass('active').siblings().removeClass('active');
				} else if (p === 68) {
					e.preventDefault();
					$('.d').addClass('active').siblings().removeClass('active');
				} else if (p === 70) {
					e.preventDefault();
					$('.f').addClass('active').siblings().removeClass('active');
				} else if (p === 71) {
					e.preventDefault();
					$('.g').addClass('active').siblings().removeClass('active');
				} else if (p === 72) {
					e.preventDefault();
					$('.h').addClass('active').siblings().removeClass('active');
				} else if (p === 74) {
					e.preventDefault();
					$('.j').addClass('active').siblings().removeClass('active');
				} else if (p === 75) {
					e.preventDefault();
					$('.k').addClass('active').siblings().removeClass('active');
				} else if (p === 76) {
					e.preventDefault();
					$('.l').addClass('active').siblings().removeClass('active');
				} else if (p === 186) {
					e.preventDefault();
					$('.col').addClass('active').siblings().removeClass('active');
				} else if (p === 222) {
					e.preventDefault();
					$('.apos').addClass('active').siblings().removeClass('active');
				} else if (p === 13) {
					e.preventDefault();
					$('.return').addClass('active').siblings().removeClass('active');
				} else if (p === 90) {
					e.preventDefault();
					$('.z').addClass('active').siblings().removeClass('active');
				} else if (p === 88) {
					e.preventDefault();
					$('.x').addClass('active').siblings().removeClass('active');
				} else if (p === 67) {
					e.preventDefault();
					$('.c').addClass('active').siblings().removeClass('active');
				} else if (p === 86) {
					e.preventDefault();
					$('.v').addClass('active').siblings().removeClass('active');
				} else if (p === 66) {
					e.preventDefault();
					$('.b').addClass('active').siblings().removeClass('active');
				} else if (p === 78) {
					e.preventDefault();
					$('.n').addClass('active').siblings().removeClass('active');
				} else if (p === 77) {
					e.preventDefault();
					$('.m').addClass('active').siblings().removeClass('active');
				} else if (p === 188) {
					e.preventDefault();
					$('.comm').addClass('active').siblings().removeClass('active');
				} else if (p === 190) {
					e.preventDefault();
					$('.great').addClass('active').siblings().removeClass('active');
				} else if (p === 191) {
					e.preventDefault();
					$('.quest').addClass('active').siblings().removeClass('active');
				} else if (p === 16) {
					e.preventDefault();
					$('.shft').addClass('active');
					$('key').not('.shft').removeClass('active');
				}


				else if (p === 220) {
					e.preventDefault();
					$('.bs').addClass('active').siblings().removeClass('active');
				}

			});

		};

		$.Depress = function() {

			$('body').on('keyup', function(e){

				var p = e.which;

				if (p === 27) {
					e.preventDefault();
					$('.esc').removeClass('active');
				} else if (p === 112) {
					e.preventDefault();
					$('.f1').removeClass('active');
				} else if (p === 113) {
					e.preventDefault();
					$('.f2').removeClass('active');
				} else if (p === 114) {
					e.preventDefault();
					$('.f3').removeClass('active');
				} else if (p === 115) {
					e.preventDefault();
					$('.f4').removeClass('active');
				} else if (p === 116) {
					e.preventDefault();
					$('.f5').removeClass('active');
				} else if (p === 117) {
					e.preventDefault();
					$('.f6').removeClass('active');
				} else if (p === 118) {
					e.preventDefault();
					$('.f7').removeClass('active');
				} else if (p === 119) {
					e.preventDefault();
					$('.f8').removeClass('active');
				} else if (p === 120) {
					e.preventDefault();
					$('.f9').removeClass('active');
				} else if (p === 121) {
					e.preventDefault();
					$('.f10').removeClass('active');
				} else if (p === 122) {
					e.preventDefault();
					$('.f11').removeClass('active');
				} else if (p === 123) {
					e.preventDefault();
					$('.f12').removeClass('active');
				} else if (p === 192) {
					e.preventDefault();
					$('.til').removeClass('active');
				} else if (p === 49) {
					e.preventDefault();
					$('.1').removeClass('active');
				} else if (p === 50) {
					e.preventDefault();
					$('.2').removeClass('active');
				} else if (p === 51) {
					e.preventDefault();
					$('.3').removeClass('active');
				} else if (p === 52) {
					e.preventDefault();
					$('.4').removeClass('active');
				} else if (p === 53) {
					e.preventDefault();
					$('.5').removeClass('active');
				} else if (p === 54) {
					e.preventDefault();
					$('.6').removeClass('active');
				} else if (p === 55) {
					e.preventDefault();
					$('.7').removeClass('active');
				} else if (p === 56) {
					e.preventDefault();
					$('.8').removeClass('active');
				} else if (p === 57) {
					e.preventDefault();
					$('.9').removeClass('active');
				} else if (p === 48) {
					e.preventDefault();
					$('.0').removeClass('active');
				} else if (p === 189) {
					e.preventDefault();
					$('.hyp').removeClass('active');
				} else if (p === 187) {
					e.preventDefault();
					$('.equ').removeClass('active');
				} else if (p === 8) {
					e.preventDefault();
					$('.delete').removeClass('active');
				} else if (p === 9) {
					e.preventDefault();
					$('.tab').removeClass('active');
				} else if (p === 81) {
					e.preventDefault();
					$('.q').removeClass('active');
				} else if (p === 87) {
					e.preventDefault();
					$('.w').removeClass('active');
				} else if (p === 69) {
					e.preventDefault();
					$('.e').removeClass('active');
				} else if (p === 82) {
					e.preventDefault();
					$('.r').removeClass('active');
				} else if (p === 84) {
					e.preventDefault();
					$('.t').removeClass('active');
				} else if (p === 89) {
					e.preventDefault();
					$('.y').removeClass('active');
				} else if (p === 85) {
					e.preventDefault();
					$('.u').removeClass('active');
				} else if (p === 73) {
					e.preventDefault();
					$('.i').removeClass('active');
				} else if (p === 79) {
					e.preventDefault();
					$('.o').removeClass('active');
				} else if (p === 80) {
					e.preventDefault();
					$('.p').removeClass('active');
				} else if (p === 219) {
					e.preventDefault();
					$('.lbrack').removeClass('active');
				} else if (p === 221) {
					e.preventDefault();
					$('.rbrack').removeClass('active');
				} else if (p === 220) {
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