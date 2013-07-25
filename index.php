<?php

$body_class = 'home';
$page_title = 'Keymap.io - Your Guide to Keyboard and ASCII Values';

$jquery_plugins = array(
	'something.js'
);

include 'header.php';

?>

		<div class="wrapper active">
			<div id="keyboard">
				<row class="one">
					<key class="single esc" data-key="27">esc</key>
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
					<key class="double til" data-key="192">~<span>`</span></key>
					<key class="double 1" data-key="49">!<span>1</span></key>
					<key class="double 2" data-key="50">@<span>2</span></key>
					<key class="double 3" data-key="51">#<span>3</span></key>
					<key class="double 4" data-key="52">$<span>4</span></key>
					<key class="double 5" data-key="53">%<span>5</span></key>
					<key class="double 6" data-key="54">^<span>6</span></key>
					<key class="double 7" data-key="55">&<span>7</span></key>
					<key class="double 8" data-key="56">*<span>8</span></key>
					<key class="double 9" data-key="57">(<span>9</span></key>
					<key class="double 0" data-key="48">)<span>0</span></key>
					<key class="double hyp" data-key="189">_<span>-</span></key>
					<key class="double equ" data-key="187">+<span>=</span></key>
					<key class="single delete right" data-key="9">Delete</key>
					<div class="clearfix"></div>
				</row>
				<row class="three">
					<key class="tab left" data-key="9">Tab</key>
					<key class="single q" data-key="81">q</key>
					<key class="single w" data-key="87">w</key>
					<key class="single e" data-key="69">e</key>
					<key class="single r" data-key="82">r</key>
					<key class="single t" data-key="84">t</key>
					<key class="single y" data-key="89">y</key>
					<key class="single u" data-key="85">u</key>
					<key class="single i" data-key="73">i</key>
					<key class="single o" data-key="79">o</key>
					<key class="single p" data-key="80">p</key>
					<key class="double lbrack" data-key="219">{<span>[</span></key>
					<key class="double rbrack" data-key="221">}<span>]</span></key>
					<key class="double bs" data-key="220">|<span>\</span></key>
					<div class="clearfix"></div>
				</row>
				<row class="four">
					<key class="caps left" data-key="20">Caps lock</key>
					<key class="single a" data-key="65">a</key>
					<key class="single s" data-key="83">s</key>
					<key class="single d" data-key="68">d</key>
					<key class="single f" data-key="70">f</key>
					<key class="single g" data-key="71">g</key>
					<key class="single h" data-key="72">h</key>
					<key class="single j" data-key="74">j</key>
					<key class="single k" data-key="75">k</key>
					<key class="single l" data-key="76">l</key>
					<key class="double col" data-key="186">:<span>;</span></key>
					<key class="double apos" data-key="222">"<span>'</span></key>
					<key class="return right" data-key="13">Enter</key>
					<div class="clearfix"></div>
				</row>
				<row class="five">
					<key class="shft left" data-key="16">Shift</key>
					<key class="single z" data-key="90">z</key>
					<key class="single x" data-key="88">x</key>
					<key class="single c" data-key="67">c</key>
					<key class="single v" data-key="86">v</key>
					<key class="single b" data-key="66">b</key>
					<key class="single n" data-key="78">n</key>
					<key class="single m" data-key="77">m</key>
					<key class="double comm" data-key="188"><<span>,</span></key>
					<key class="double great" data-key="190">><span>.</span></key>
					<key class="double quest" data-key="191">?<span>/</span></key>
					<key class="shft right" data-key="16">Shift</key>
					<div class="clearfix"></div>
				</row>
				<row class="six">

					<div class="clearfix"></div>
				</row>
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