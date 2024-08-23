import React from 'react';

function Row5() {
    return (
        <div className="five">
            <div className="shft left" data-key="16">Shift</div>
            <div className="single z" data-key="90" data-encode="%7A" data-encodecaps="%5A" data-uni="U+007A" data-unicaps="U+005A">z</div>
            <div className="single x" data-key="88" data-encode="%78" data-encodecaps="%58" data-uni="U+0078" data-unicaps="U+0058">x</div>
            <div className="single c" data-key="67" data-encode="%63" data-encodecaps="%43" data-uni="U+0063" data-unicaps="U+0043">c</div>
            <div className="single v" data-key="86" data-encode="%76" data-encodecaps="%56" data-uni="U+0076" data-unicaps="U+0056">v</div>
            <div className="single b" data-key="66" data-encode="%62" data-encodecaps="%42" data-uni="U+0062" data-unicaps="U+0042">b</div>
            <div className="single n" data-key="78" data-encode="%6E" data-encodecaps="%4E" data-uni="U+006E" data-unicaps="U+004E">n</div>
            <div className="single m" data-key="77" data-encode="%6D" data-encodecaps="%4D" data-uni="U+006D" data-unicaps="U+004D">m</div>
            <div className="double comm" data-key="188" data-encode="%2C" data-encodecaps="%3C" data-uni="U+002C" data-unicaps="U+003C">
                <span>&lt;</span><span>,</span>
            </div>
            <div className="double great" data-key="190" data-encode="%2E" data-encodecaps="%3E" data-uni="U+002E" data-unicaps="U+003E">
                <span>&gt;</span><span>.</span>
            </div>
            <div className="double quest" data-key="191" data-encode="%2F" data-encodecaps="%3F" data-uni="U+002F" data-unicaps="U+003F">
                <span>?</span><span>/</span>
            </div>
            <div className="shft right" data-key="16">Shift</div>
            <div className="clearfix"></div>
        </div>
    );
}

export default Row5;
