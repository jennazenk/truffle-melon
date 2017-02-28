var exchangeContract;
var lastOfferId;
var secondLastOfferId;

//user info
setTimeout(function() {
    var userAddress = web3.eth.accounts[0];
    $("#useraddress").append(userAddress);
    web3.eth.getBalance(userAddress, function(err, res) {
        if (!err) {
            $("#userbalance").append(res.toNumber() + " wei");
        } else {
            console.log(err);
        }
    })
}, 1000);

//Two last offers  
setTimeout(function() {
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        exchangeContract = instance;
        return instance;
    }).then(function(instance) {
        return instance.getLastOfferId();
    }).then(function(lastOffer) {
        lastOfferId = lastOffer.c[0];
        $("#offer1id").append(lastOfferId);
        return lastOfferId
    }).then(function(lastOfferId) {
        return exchangeContract.getOwner(lastOfferId);
    }).then(function(owner) {
        $("#offer1owner").append(owner);
    }).then(function() {
        return exchangeContract.isActive(lastOfferId);
    }).then(function(bool) {
        if (bool === true) $("#offer1active").append("Active");
        else {
            $("#offer1active").append("Inactive")
            return
        }
    }).then(function() {
        secondLastOfferId = lastOfferId-1;
        $("#offer2id").append(secondLastOfferId);
        return secondLastOfferId ;
    }).then(function(secondLastOfferId) {
        return exchangeContract.getOwner(secondLastOfferId)
    }).then(function(owner2) {
        $("#offer2owner").append(owner2);
        return exchangeContract.isActive(secondLastOfferId)
    }).then(function(bool) {
        if (bool === true) $("#offer2active").append("Active");
        else {
            $("#offer2active").append("Inactive")
            return
        }
    })
}, 1000);

//order2 ---we can use the lastOfferId that we previously got

//order2
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
console.log("Exchange protocole : ", Exchange);



// console.log(myContract.getLastOfferId());



// $(document).ready(function() {

//     $("div").css("border", "3px solid red");
//     // $("#result").append("JENNA");
//     // $("#result").append(res);
//     document.getElementById("myRes").value = "JENNA";

// });
