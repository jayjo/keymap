<?php

$body_class = 'home';
$page_title = 'Keycodes - Javascript Keyboard Codes, Character Codes, Unicode, HTML Entities';

$jquery_plugins = array(
	'something.js'
);

include 'header.php';

?>

		<div class="wrapper">
			<div id="keyboard">
				<row class="one">
					<key class="single esc" data-key="27" data-encode="%1B" data-encodecaps="%1B">esc</key>
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
					<key class="single f13" data-key="124">F13</key>
					<div class="clearfix"></div>
				</row>
				<row class="two">
					<key class="double til" data-key="192" data-encode="%7E" data-encodecaps="%60" data-uni="U+0060" data-unicaps="U+007E">~<span>`</span></key>
					<key class="double 1" data-key="49" data-encode="%31" data-encodecaps="%21" data-uni="U+0031" data-unicaps="U+0021">!<span>1</span></key>
					<key class="double 2" data-key="50" data-encode="%32" data-encodecaps="%40" data-uni="U+0032" data-unicaps="U+0040">@<span>2</span></key>
					<key class="double 3" data-key="51" data-encode="%33" data-encodecaps="%23" data-uni="U+0033" data-unicaps="U+0023">#<span>3</span></key>
					<key class="double 4" data-key="52" data-encode="%34" data-encodecaps="%24" data-uni="U+0034" data-unicaps="U+0024">$<span>4</span></key>
					<key class="double 5" data-key="53" data-encode="%35" data-encodecaps="%25" data-uni="U+0035" data-unicaps="U+0025">%<span>5</span></key>
					<key class="double 6" data-key="54" data-encode="%36" data-encodecaps="%5E" data-uni="U+0036" data-unicaps="U+005E">^<span>6</span></key>
					<key class="double 7" data-key="55" data-encode="%37" data-encodecaps="%26" data-uni="U+0037" data-unicaps="U+0026">&<span>7</span></key>
					<key class="double 8" data-key="56" data-encode="%38" data-encodecaps="%2A" data-uni="U+0038" data-unicaps="U+002A">*<span>8</span></key>
					<key class="double 9" data-key="57" data-encode="%39" data-encodecaps="%28" data-uni="U+0039" data-unicaps="U+0028">(<span>9</span></key>
					<key class="double 0" data-key="48" data-encode="%30" data-encodecaps="%29" data-uni="U+0030" data-unicaps="U+0029">)<span>0</span></key>
					<key class="double hyp" data-key="189" data-encode="%2D" data-encodecaps="%5F" data-uni="U+002D" data-unicaps="U+005F">_<span>-</span></key>
					<key class="double equ" data-key="187" data-encode="%3D" data-encodecaps="%2B" data-uni="U+003D" data-unicaps="U+002B">+<span>=</span></key>
					<key class="single delete right" data-key="8" data-encode="%08" data-encodecaps="%08" data-uni="U+007F">Delete</key>
					<div class="clearfix"></div>
				</row>
				<row class="three">
					<key class="tab left" data-key="9" data-encode="%09" data-encodecaps="%09" data-uni="U+0009">Tab</key>
					<key class="single q" data-key="81" data-encode="%71" data-encodecaps="%51" data-uni="U+0071" data-unicaps="U+0051">q</key>
					<key class="single w" data-key="87" data-encode="%77" data-encodecaps="%57" data-uni="U+0077" data-unicaps="U+0057">w</key>
					<key class="single e" data-key="69" data-encode="%65" data-encodecaps="%45" data-uni="U+0065" data-unicaps="U+0045">e</key>
					<key class="single r" data-key="82" data-encode="%72" data-encodecaps="%52" data-uni="U+0072" data-unicaps="U+0052">r</key>
					<key class="single t" data-key="84" data-encode="%74" data-encodecaps="%54" data-uni="U+0074" data-unicaps="U+0054">t</key>
					<key class="single y" data-key="89" data-encode="%79" data-encodecaps="%59" data-uni="U+0079" data-unicaps="U+0059">y</key>
					<key class="single u" data-key="85" data-encode="%75" data-encodecaps="%55" data-uni="U+0075" data-unicaps="U+0055">u</key>
					<key class="single i" data-key="73" data-encode="%69" data-encodecaps="%49" data-uni="U+0069" data-unicaps="U+0049">i</key>
					<key class="single o" data-key="79" data-encode="%6F" data-encodecaps="%4F" data-uni="U+006F" data-unicaps="U+004F">o</key>
					<key class="single p" data-key="80" data-encode="%70" data-encodecaps="%50" data-uni="U+0070" data-unicaps="U+0050">p</key>
					<key class="double lbrack" data-key="219" data-encode="%5B" data-encodecaps="%7B" data-uni="U+005B" data-unicaps="U+007B">{<span>[</span></key>
					<key class="double rbrack" data-key="221" data-encode="%5D" data-encodecaps="%7D" data-uni="U+005D" data-unicaps="U+007D">}<span>]</span></key>
					<key class="double bs" data-key="220" data-encode="%5C" data-encodecaps="%7C" data-uni="U+005C" data-unicaps="U+007C">|<span>\</span></key>
					<div class="clearfix"></div>
				</row>
				<row class="four">
					<key class="caps left" data-key="20">Caps lock</key>
					<key class="single a" data-key="65" data-encode="%61" data-encodecaps="%41" data-uni="U+0061" data-unicaps="U+0041">a</key>
					<key class="single s" data-key="83" data-encode="%73" data-encodecaps="%53" data-uni="U+0073" data-unicaps="U+0053">s</key>
					<key class="single d" data-key="68" data-encode="%64" data-encodecaps="%44" data-uni="U+0064" data-unicaps="U+0044">d</key>
					<key class="single f" data-key="70" data-encode="%66" data-encodecaps="%46" data-uni="U+0066" data-unicaps="U+0046">f</key>
					<key class="single g" data-key="71" data-encode="%67" data-encodecaps="%47" data-uni="U+0067" data-unicaps="U+0047">g</key>
					<key class="single h" data-key="72" data-encode="%68" data-encodecaps="%48" data-uni="U+0068" data-unicaps="U+0048">h</key>
					<key class="single j" data-key="74" data-encode="%6A" data-encodecaps="%4A" data-uni="U+006A" data-unicaps="U+004A">j</key>
					<key class="single k" data-key="75" data-encode="%6B" data-encodecaps="%4B" data-uni="U+006B" data-unicaps="U+004B">k</key>
					<key class="single l" data-key="76" data-encode="%6C" data-encodecaps="%4C" data-uni="U+006C" data-unicaps="U+004C">l</key>
					<key class="double col" data-key="186" data-encode="%3B" data-encodecaps="%3A" data-uni="U+003B" data-unicaps="U+003A">:<span>;</span></key>
					<key class="double apos" data-key="222" data-encode="%27" data-encodecaps="%22" data-uni="U+0027" data-unicaps="U+0022">"<span>'</span></key>
					<key class="return right" data-key="13" data-encode="%0D" data-encodecaps="%0D" data-uni="U+000D">Enter</key>
					<span class="cap">caps lock on</span>
					<div class="clearfix"></div>
				</row>
				<row class="five">
					<key class="shft left" data-key="16">Shift</key>
					<key class="single z" data-key="90" data-encode="%7A" data-encodecaps="%5A" data-uni="U+007A" data-unicaps="U+005A">z</key>
					<key class="single x" data-key="88" data-encode="%78" data-encodecaps="%58" data-uni="U+0078" data-unicaps="U+0058">x</key>
					<key class="single c" data-key="67" data-encode="%63" data-encodecaps="%43" data-uni="U+0063" data-unicaps="U+0043">c</key>
					<key class="single v" data-key="86" data-encode="%76" data-encodecaps="%56" data-uni="U+0076" data-unicaps="U+0056">v</key>
					<key class="single b" data-key="66" data-encode="%62" data-encodecaps="%42" data-uni="U+0062" data-unicaps="U+0042">b</key>
					<key class="single n" data-key="78" data-encode="%6E" data-encodecaps="%4E" data-uni="U+006E" data-unicaps="U+004E">n</key>
					<key class="single m" data-key="77" data-encode="%6D" data-encodecaps="%4D" data-uni="U+006D" data-unicaps="U+004D">m</key>
					<key class="double comm" data-key="188" data-encode="%2C" data-encodecaps="%3C" data-uni="U+002C" data-unicaps="U+003C"><<span>,</span></key>
					<key class="double great" data-key="190" data-encode="%2E" data-encodecaps="%3E" data-uni="U+002E" data-unicaps="U+003E">><span>.</span></key>
					<key class="double quest" data-key="191" data-encode="%2F" data-encodecaps="%3F" data-uni="U+002F" data-unicaps="U+003F">?<span>/</span></key>
					<key class="shft right" data-key="16">Shift</key>
					<div class="clearfix"></div>
				</row>
				<row class="six">
					<key class="single ctrl left" data-key="17">control</key>
					<key class="single opt left" data-key="18">option</key>
					<key class="single cmd left" data-key="91">command</key>
					<key class="single space left" data-key="32" data-encode="%20" data-encodecaps="%20"></key>
					<key class="single cmd right" data-key="91">command</key>
					<key class="single opt right" data-key="18">option</key>
					<key class="single ctrl right" data-key="17">control</key>
					<div class="clearfix"></div>
				</row>
				<h1 id="logo" class="gray"><a href="/">KeyCodes</a></h1>
			</div>
			<div id="keypad">

			</div>
			<display id="codebox">
				<div class="code-inner dark"><p>I have grown tired of searching online through tables of character codes, so I built Keycodes to help me out. Feel free to use it, that's why it's here. Check back periodically or follow me on Twitter (<span>@jayjo</span>) for updates and other cool stuff.</p></div>
				<div class="code-inner">
					<input type="text" value="" name="codebox" disabled/>
					<div class="success">Duck!</div>
				</div>
			</display>
		</div>

<?php include 'footer.php'; ?>