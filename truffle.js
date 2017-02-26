// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 8545,
//       network_id: "*" // Match any network id
//     }
//   }
// };

// var Web3 = require("web3");
var DefaultBuilder = require("truffle-default-builder");


module.exports = {
 build: new DefaultBuilder({
   "index.html": "index.html",
   "app.js": [
     //"js/lib/jquery.min.js",
     "js/index.js"
   ],
   "app.css": [
     "css/main.css"
   ],
   "images/": "images/"
 }),
 networks: {
  // ropsten: {
  //    host: "localhost",
  //    port: 8545,
  //    network_id: 1
  //    //from: "0x7148D9d9e96cB001A8b0Acb24E0C8e803Df37066"
  //  },
  // ropstengeth: {
  //    host: "0.0.0.0",
  //    port: 8545,
  //    network_id: "*",
  //    from: "0xb05c804d5828295e6b1209a5ecd843d956af6376"
  //  },
   testrpc: {
     host: "localhost",
     port: 8545,
     network_id: 3
   }
 }
};