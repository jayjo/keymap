import React from 'react';

function CodeType() {
    return (
        <aside>
            <menu className="codetype">
                <a href="#charcode" id="charcode">Keycode</a>
                <a href="#unicode" id="unicode">Unicode</a>
                <a href="#encoded" id="encoded">URL Encoded</a>
            </menu>
            <div className="twitter-share">
                <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://keycodes.atjayjo.com" data-text="Tired of hunting through lists of character codes - checkout Keycodes" data-via="jayjo">Tweet</a>
            </div>
        </aside>
    );
}

export default CodeType;
