var DefaultBuilder = require("truffle-default-builder");


module.exports = {
 build: new DefaultBuilder({
   "index.html": "index.html",
   "app.js": [
     "js/index.js"
   ],
   "app.css": [
     "css/main.css"
   ],
 }),
 networks: {
   testrpc: {
     host: "localhost",
     port: 8545,
     network_id: 3
   }
 }
};