import React from 'react';

function Keypad() {
    return (
        <div className="keypad">
            <div className="single clear" data-key="12">clear</div>
            <div className="single equals" data-key="187">=</div>
            <div className="single forslash" data-key="111">/</div>
            <div className="single asterisk" data-key="106">*</div>
            <div className="single seven" data-key="55">7</div>
            <div className="single eight" data-key="56">8</div>
            <div className="single nine" data-key="57">9</div>
            <div className="single hyphen" data-key="109">-</div>
            <div className="single four" data-key="52">4</div>
            <div className="single five" data-key="53">5</div>
            <div className="single six" data-key="54">6</div>
            <div className="single plus" data-key="107">+</div>
            <div className="single one" data-key="49">1</div>
            <div className="single two" data-key="50">2</div>
            <div className="single three" data-key="51">3</div>
            <div className="single zero" data-key="48">0</div>
            <div className="single period" data-key="110">.</div>
            <div className="single enter" data-key="13">enter</div>
            <button>
                <span className="expand">+</span>
                <span className="minimize inactive">-</span>
            </button>
            <div className="clearfix"></div>
        </div>
    );
}

export default Keypad;
