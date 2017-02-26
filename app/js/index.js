// setTimeout(function() {
//     // console.log(web3);
//     Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
//         return instance.getLastOfferId();
//     }).then(function(res) {
//         var myRes = res.c[0];
//         $("#order1").append(myRes);
//         console.log('Here', res)
//     })
// }, 3000);

var exchangeContract;
var lastOfferId;

setTimeout(function() {
    var userAddress = web3.eth.accounts[0];
    $("#useraddress").append(userAddress);
    console.log("User address is ", userAddress);

    web3.eth.getBalance(userAddress, function(err, res) {
        if (!err) {
            $("#userbalance").append(res.toNumber());
            console.log("User balance is ", res.toNumber());
        } else {
        	console.log(err);
        }
    })
}, 1000);

setTimeout(function() {
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        exchangeContract = instance;
        return instance;
    }).then(function(instance) {
        return instance.getLastOfferId();
    }).then(function(lastOffer) {
        lastOfferId = lastOffer.c[0];
        $("#order1id").append(lastOfferId);
        return lastOfferId
    }).then(function(lastOfferId) {
        return exchangeContract.getOwner(lastOfferId);
    }).then(function(owner) {
        $("#order1owner").append(owner);
    }).then(function() {
        return exchangeContract.isActive(lastOfferId);
    }).then(function(bool) {
        $("#order1active").append(bool);

    })
}, 1000);



// setTimeout(function() {
//     Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
//         return instance;
//     }).then(function(instance) {
//     	return instance.getLastOfferId();
//     }).then(function(lastOffer) {
//         var myRes = lastOffer.c[0];
//  		$("#order1").append(myRes);
//  		console.log('Here', lastOffer);
//     })
// }, 3000);

console.log("Welcome to Melon Challenge");
console.log(Exchange);



// console.log(myContract.getLastOfferId());



// $(document).ready(function() {

//     $("div").css("border", "3px solid red");
//     // $("#result").append("JENNA");
//     // $("#result").append(res);
//     document.getElementById("myRes").value = "JENNA";

// });
