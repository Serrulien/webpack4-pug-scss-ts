import './style.css'; // this style file will be handled by the loaders and plugins
// require('./style.css'); // if using javascript
import './style.scss'; 

import { MyClass } from './class-example'; // we can omit the .ts extension thanks to resolve.extensions

console.log("hello"); // will log "hello" in browser's console
console.log(new MyClass().getContent());

document.getElementsByTagName('h1')[0].textContent = "this text is set on client runtime";
