import {JSDOM} from 'jsdom'

const jsdom = new JSDOM(`<body></body>`);

global.XMLHttpRequest = jsdom.window.XMLHttpRequest;;
global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.history = jsdom.window.history;
