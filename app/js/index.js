
setTimeout(function() {
    // console.log(web3);
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        return instance.getLastOfferId();
    }).then(function(res) {
    	$("#result").append(res);
        console.log('Here', res)
    })
}, 3000);

console.log("Welcome to Melon Challenge");
console.log(Exchange);



// console.log(myContract.getLastOfferId());
