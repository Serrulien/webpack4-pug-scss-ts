import './style.css'; // this style file will be handled by the loaders and plugins
// require('./style.css'); // if using javascript
import './style.scss'; 

// executed by the client
const container = document.getElementById('container');

if(container) 
    container.innerHTML = "<ul><li>product 1</li><li>product 2</li></ul>";
