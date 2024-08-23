import React from 'react';

function Row4() {
    return (
        <div className="four">
            <div className="caps left" data-key="20">Caps lock</div>
            <div className="single a" data-key="65" data-encode="%61" data-encodecaps="%41" data-uni="U+0061" data-unicaps="U+0041">a</div>
            <div className="single s" data-key="83" data-encode="%73" data-encodecaps="%53" data-uni="U+0073" data-unicaps="U+0053">s</div>
            <div className="single d" data-key="68" data-encode="%64" data-encodecaps="%44" data-uni="U+0064" data-unicaps="U+0044">d</div>
            <div className="single f" data-key="70" data-encode="%66" data-encodecaps="%46" data-uni="U+0066" data-unicaps="U+0046">f</div>
            <div className="single g" data-key="71" data-encode="%67" data-encodecaps="%47" data-uni="U+0067" data-unicaps="U+0047">g</div>
            <div className="single h" data-key="72" data-encode="%68" data-encodecaps="%48" data-uni="U+0068" data-unicaps="U+0048">h</div>
            <div className="single j" data-key="74" data-encode="%6A" data-encodecaps="%4A" data-uni="U+006A" data-unicaps="U+004A">j</div>
            <div className="single k" data-key="75" data-encode="%6B" data-encodecaps="%4B" data-uni="U+006B" data-unicaps="U+004B">k</div>
            <div className="single l" data-key="76" data-encode="%6C" data-encodecaps="%4C" data-uni="U+006C" data-unicaps="U+004C">l</div>
            <div className="double col" data-key="186" data-encode="%3B" data-encodecaps="%3A" data-uni="U+003B" data-unicaps="U+003A">
                <span>:</span><span>;</span>
            </div>
            <div className="double apos" data-key="222" data-encode="%27" data-encodecaps="%22" data-uni="U+0027" data-unicaps="U+0022">
                <span>"</span><span>'</span>
            </div>
            <div className="return right" data-key="13" data-encode="%0D" data-encodecaps="%0D" data-uni="U+000D">Enter</div>
            <span className="cap">caps lock on</span>
            <div className="clearfix"></div>
        </div>
    );
}

export default Row4;
