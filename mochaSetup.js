import {JSDOM} from 'jsdom'
import { XMLHttpRequest } from "node-xmlhttprequest";

const jsdom = new JSDOM(`<body></body>`);

global.XMLHttpRequest = XMLHttpRequest;
global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.history = jsdom.window.history;
