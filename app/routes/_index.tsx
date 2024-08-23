import type { MetaFunction } from "@vercel/remix";
import { Link } from '@remix-run/react';
import Header from '~/components/Header';
import Row1 from '~/components/Row1';
import Row2 from '~/components/Row2';
import Row3 from '~/components/Row3';
import Row4 from '~/components/Row4';
import Row5 from '~/components/Row5';
import Row6 from '~/components/Row6';
import CodeBox from '~/components/CodeBox';
import Footer from '~/components/Footer';
import Keypad from '~/components/Keypad';

export const meta: MetaFunction = () => {
  return [
    { title: "Keycodes - Javascript Keyboard Codes, Character Codes, Unicode, HTML Entities" },
    { name: "description", content: "Your guide to keyboard codes, unicodes, keycodes, javascript character codes, charcodes - by @JayJo!" },
  ];
};

export default function Index() {
  return (
    <div className="home">
      <Header />

      <div className="wrapper">
          <div id="keyboard">
              <Row1 />
              <Row2 />
              <Row3 />
              <Row4 />
              <Row5 />
              <Row6 />
              <h1 id="logo" className="gray">
                  <Link to="/">KeyCodes</Link>
              </h1>
          </div>

          <div id="keypad"></div>

          <CodeBox />
      </div>

      <Footer />
      <Keypad />
    </div>
  );
}
