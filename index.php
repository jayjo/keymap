<?php

$body_class = 'home';
$page_title = 'Keymap.io - Your Guide to Keyboard and ASCII Values';

$jquery_plugins = array(
	'something.js'
);

include 'header.php';

?>

	<div class="wrapper">
		<div id="keyboard">
			<row class="one">
				<key class="single esc">esc</key>
				<key class="single f1">F1</key>
				<key class="single f2">f2</key>
				<key class="single f3">f3</key>
				<key class="single f4">f4</key>
				<key class="single f5">f5</key>
				<key class="single f6">f6</key>
				<key class="single f7">f7</key>
				<key class="single f8">f8</key>
				<key class="single f9">f9</key>
				<key class="single f10">f10</key>
				<key class="single f11">f11</key>
				<key class="single f12">f12</key>
				<key class="single f13">F13</key>
				<div class="clearfix"></div>
			</row>
			<row class="two">
				<key class="double til">~<span>`</span></key>
				<key class="double 1">!<span>1</span></key>
				<key class="double 2">@<span>2</span></key>
				<key class="double 3">#<span>3</span></key>
				<key class="double 4">$<span>4</span></key>
				<key class="double 5">%<span>5</span></key>
				<key class="double 6">^<span>6</span></key>
				<key class="double 7">&<span>7</span></key>
				<key class="double 8">*<span>8</span></key>
				<key class="double 9">(<span>9</span></key>
				<key class="double 0">)<span>0</span></key>
				<key class="double hyp">_<span>-</span></key>
				<key class="double equ">+<span>=</span></key>
				<key class="single delete right">Delete</key>
				<div class="clearfix"></div>
			</row>
			<row class="three">
				<key class="tab left">Tab</key>
				<key class="single q">q</key>
				<key class="single w">w</key>
				<key class="single e">e</key>
				<key class="single r">r</key>
				<key class="single t">t</key>
				<key class="single y">y</key>
				<key class="single u">u</key>
				<key class="single i">i</key>
				<key class="single o">o</key>
				<key class="single p">p</key>
				<key class="double lbrack">{<span>[</span></key>
				<key class="double rbrack">}<span>]</span></key>
				<key class="double bs">|<span>\</span></key>
				<div class="clearfix"></div>
			</row>
			<row class="four">
				<key class="single caps left">Caps lock</key>
				<key class="single a">a</key>
				<key class="single s">s</key>
				<key class="single d">d</key>
				<key class="single f">f</key>
				<key class="single g">g</key>
				<key class="single h">h</key>
				<key class="single j">j</key>
				<key class="single k">k</key>
				<key class="single l">l</key>
				<key class="double col">:<span>;</span></key>
				<key class="double apos">"<span>'</span></key>
				<key class="single return right double">Enter<span>return</span></key>
				<div class="clearfix"></div>
			</row>
			<row class="five">
				<key class="single shft left">Shift</key>
				<key class="single z">z</key>
				<key class="single x">x</key>
				<key class="single c">c</key>
				<key class="single v">v</key>
				<key class="single b">b</key>
				<key class="single n">n</key>
				<key class="single m">m</key>
				<key class="double comm"><<span>,</span></key>
				<key class="double great">><span>.</span></key>
				<key class="double quest">?<span>/</span></key>
				<key class="single shft right">Shift</key>
				<div class="clearfix"></div>
			</row>
			<row class="six">

				<div class="clearfix"></div>
			</row>
		</div>
		<div id="keypad">

		</div>
		<display id="codebox">
			<input type="text" value="44" name="codebox" />
		</display>
	</div>

<?php include 'footer.php'; ?>