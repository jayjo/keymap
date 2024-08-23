import React from 'react';

function ThemeSwitcher() {
    return (
        <header>
            <p className="theme-switcher"></p>
            <menu className="theme">
                <a href="#" className="default">Default</a>
                <a href="#" className="light">Light</a>
                <a href="#" className="blue">Blue</a>
                <a href="#" className="yellow">Yellow</a>
                <a href="#" className="red">Red</a>
                <a href="#" className="green">Green</a>
                <a href="#" className="purple">Purple</a>
                <a href="#" className="orange">Orange</a>
            </menu>
        </header>
    );
}

export default ThemeSwitcher;
