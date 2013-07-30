<?php

$body_class = 'home';
$page_title = 'Keymap.io - Your Guide to Keyboard and ASCII Values';

$jquery_plugins = array(
	'something.js'
);

include 'header.php';

?>

		<div class="wrapper">
			<div id="keyboard" class="charcode">
				<row class="one">
					<key class="single esc" data-key="27" data-uni="">esc</key>
					<key class="single f1" data-key="112">F1</key>
					<key class="single f2" data-key="113">f2</key>
					<key class="single f3" data-key="114">f3</key>
					<key class="single f4" data-key="115">f4</key>
					<key class="single f5" data-key="116">f5</key>
					<key class="single f6" data-key="117">f6</key>
					<key class="single f7" data-key="118">f7</key>
					<key class="single f8" data-key="119">f8</key>
					<key class="single f9" data-key="120">f9</key>
					<key class="single f10" data-key="121">f10</key>
					<key class="single f11" data-key="122">f11</key>
					<key class="single f12" data-key="123">f12</key>
					<key class="single f13" data-key="">F13</key>
					<div class="clearfix"></div>
				</row>
				<row class="two">
					<key class="double til" data-key="192" data-uni="U+0060">~<span>`</span></key>
					<key class="double 1" data-key="49" data-uni="U+0031">!<span>1</span></key>
					<key class="double 2" data-key="50" data-uni="U+0032">@<span>2</span></key>
					<key class="double 3" data-key="51" data-uni="U+0033">#<span>3</span></key>
					<key class="double 4" data-key="52" data-uni="U+0034">$<span>4</span></key>
					<key class="double 5" data-key="53" data-uni="U+0035">%<span>5</span></key>
					<key class="double 6 deactivated" data-key="54" data-uni="U+0036">^<span>6</span></key>
					<key class="double 7" data-key="55" data-uni="U+0037">&<span>7</span></key>
					<key class="double 8" data-key="56" data-uni="U+0038">*<span>8</span></key>
					<key class="double 9" data-key="57" data-uni="U+0039">(<span>9</span></key>
					<key class="double 0" data-key="48" data-uni="U+0030">)<span>0</span></key>
					<key class="double hyp" data-key="189" data-uni="U+002D">_<span>-</span></key>
					<key class="double equ" data-key="187" data-uni="U+003D">+<span>=</span></key>
					<key class="single delete right" data-key="9" data-uni="U+007F">Delete</key>
					<div class="clearfix"></div>
				</row>
				<row class="three">
					<key class="tab left" data-key="9" data-uni="U+0009">Tab</key>
					<key class="single q" data-key="81" data-uni="U+0071">q</key>
					<key class="single w" data-key="87" data-uni="U+0077">w</key>
					<key class="single e" data-key="69" data-uni="U+0065">e</key>
					<key class="single r" data-key="82" data-uni="U+0072">r</key>
					<key class="single t" data-key="84" data-uni="U+0074">t</key>
					<key class="single y" data-key="89" data-uni="U+0079">y</key>
					<key class="single u" data-key="85" data-uni="U+0075">u</key>
					<key class="single i" data-key="73" data-uni="U+0069">i</key>
					<key class="single o" data-key="79" data-uni="U+006F">o</key>
					<key class="single p" data-key="80" data-uni="U+0070">p</key>
					<key class="double lbrack" data-key="219" data-uni="U+005B">{<span>[</span></key>
					<key class="double rbrack" data-key="221" data-uni="U+005D">}<span>]</span></key>
					<key class="double bs" data-key="220" data-uni="U+005C">|<span>\</span></key>
					<div class="clearfix"></div>
				</row>
				<row class="four">
					<key class="caps left" data-key="20" data-uni="">Caps lock</key>
					<key class="single a" data-key="65" data-uni="U+0061">a</key>
					<key class="single s" data-key="83" data-uni="U+0073">s</key>
					<key class="single d" data-key="68" data-uni="U+0064">d</key>
					<key class="single f" data-key="70" data-uni="U+0066">f</key>
					<key class="single g" data-key="71" data-uni="U+0067">g</key>
					<key class="single h" data-key="72" data-uni="U+0068">h</key>
					<key class="single j" data-key="74" data-uni="U+006A">j</key>
					<key class="single k" data-key="75" data-uni="U+006B">k</key>
					<key class="single l" data-key="76" data-uni="U+006C">l</key>
					<key class="double col" data-key="186" data-uni="U+003B">:<span>;</span></key>
					<key class="double apos" data-key="222" data-uni="U+0027">"<span>'</span></key>
					<key class="return right" data-key="13" data-uni="U+000D">Enter</key>
					<div class="clearfix"></div>
				</row>
				<row class="five">
					<key class="shft left" data-key="16" data-uni="">Shift</key>
					<key class="single z" data-key="90" data-uni="">z</key>
					<key class="single x" data-key="88" data-uni="">x</key>
					<key class="single c" data-key="67" data-uni="">c</key>
					<key class="single v" data-key="86" data-uni="">v</key>
					<key class="single b" data-key="66" data-uni="">b</key>
					<key class="single n" data-key="78" data-uni="">n</key>
					<key class="single m" data-key="77" data-uni="">m</key>
					<key class="double comm" data-key="188" data-uni="U+002C"><<span>,</span></key>
					<key class="double great" data-key="190" data-uni="U+002E">><span>.</span></key>
					<key class="double quest" data-key="191" data-uni="U+002F">?<span>/</span></key>
					<key class="shft right" data-key="16" data-uni="">Shift</key>
					<div class="clearfix"></div>
				</row>
				<row class="six">
					<key class="single ctrl left">control</key>
					<key class="single opt left">option</key>
					<key class="single cmd left">command</key>
					<key class="single space left"></key>
					<key class="single cmd right">command</key>
					<key class="single opt right">option</key>
					<key class="single ctrl right">control</key>
					<div class="clearfix"></div>
				</row>
				<h1 id="logo" class="blue"><a href="/">KeyCodes</a></h1>
                <div class="copyright">
                    <p>Made with <span class="heart">love</span> in 2013, by <a href="#">@jayjo</a></p>
                </div>
			</div>
			<div id="keypad">

			</div>
			<display id="codebox">
				<div class="code-inner">
					<input type="text" value="" name="codebox" />
				</div>
			</display>
		</div>

<?php include 'footer.php'; ?>