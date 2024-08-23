import React from 'react';

function CodeBox() {
    return (
        <div id="codebox">
            <div className="code-inner dark">
                <p>
                    I have grown tired of searching online through lists of character codes, so I built Keycodes to help me out. 
                    Feel free to use it, that's why it's here. Check back periodically or follow me on Twitter (
                    <span>@jayjo</span>) for updates and other cool stuff.
                </p>
            </div>
            <div className="code-inner">
                <input type="text" value="" name="codebox" id="codebox-stuff" className="codebox-text" disabled />
                <div className="success">Copied!</div>
            </div>
        </div>
    );
}

export default CodeBox;
