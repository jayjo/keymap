import React from 'react';

function Row6() {
    return (
        <div className="six">
            <div className="single ctrl left" data-key="17">control</div>
            <div className="single opt left" data-key="18">option</div>
            <div className="single cmd left" data-key="91">command</div>
            <div className="single space left" data-key="32" data-encode="%20" data-encodecaps="%20"></div>
            <div className="single cmd right" data-key="91">command</div>
            <div className="single opt right" data-key="18">option</div>
            <div className="single ctrl right" data-key="17">control</div>
            <div className="clearfix"></div>
        </div>
    );
}

export default Row6;
