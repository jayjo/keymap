// File: routes/main.jsx
import React from 'react';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CodeType from '~/components/CodeType';
import SectionWrap from '~/components/SectionWrap';

function Header() {
    return (
        <div>
            <ThemeSwitcher />
            <CodeType />
            <SectionWrap />
        </div>
    );
}

export default Header;
