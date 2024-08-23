import React from 'react';

function Row3() {
    return (
        <div className="three">
            <div className="tab left" data-key="9" data-encode="%09" data-encodecaps="%09" data-uni="U+0009">Tab</div>
            <div className="single q" data-key="81" data-encode="%71" data-encodecaps="%51" data-uni="U+0071" data-unicaps="U+0051">q</div>
            <div className="single w" data-key="87" data-encode="%77" data-encodecaps="%57" data-uni="U+0077" data-unicaps="U+0057">w</div>
            <div className="single e" data-key="69" data-encode="%65" data-encodecaps="%45" data-uni="U+0065" data-unicaps="U+0045">e</div>
            <div className="single r" data-key="82" data-encode="%72" data-encodecaps="%52" data-uni="U+0072" data-unicaps="U+0052">r</div>
            <div className="single t" data-key="84" data-encode="%74" data-encodecaps="%54" data-uni="U+0074" data-unicaps="U+0054">t</div>
            <div className="single y" data-key="89" data-encode="%79" data-encodecaps="%59" data-uni="U+0079" data-unicaps="U+0059">y</div>
            <div className="single u" data-key="85" data-encode="%75" data-encodecaps="%55" data-uni="U+0075" data-unicaps="U+0055">u</div>
            <div className="single i" data-key="73" data-encode="%69" data-encodecaps="%49" data-uni="U+0069" data-unicaps="U+0049">i</div>
            <div className="single o" data-key="79" data-encode="%6F" data-encodecaps="%4F" data-uni="U+006F" data-unicaps="U+004F">o</div>
            <div className="single p" data-key="80" data-encode="%70" data-encodecaps="%50" data-uni="U+0070" data-unicaps="U+0050">p</div>
            <div className="double lbrack" data-key="219" data-encode="%5B" data-encodecaps="%7B" data-uni="U+005B" data-unicaps="U+007B">
                <span>[</span>
            </div>
            <div className="double rbrack" data-key="221" data-encode="%5D" data-encodecaps="%7D" data-uni="U+005D" data-unicaps="U+007D">
                <span>]</span>
            </div>
            <div className="double bs" data-key="220" data-encode="%5C" data-encodecaps="%7C" data-uni="U+005C" data-unicaps="U+007C">
                <span>|</span><span>\</span>
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

export default Row3;
