var exchangeContract;
var lastOfferId;
var secondLastOfferId;


var testContract;

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
        return lastOfferId;
    }).then(function(lastOfferId) {
        return exchangeContract.getOwner(lastOfferId);
    }).then(function(owner) {
        $("#offer1owner").append(owner);
    }).then(function() {
        return exchangeContract.isActive(lastOfferId);
    }).then(function(bool) {
        if (bool === true) $("#offer1active").append("Active");
        else {
            $("#offer1active").append("Inactive");
            return;
        }
    }).then(function() {
        secondLastOfferId = lastOfferId-1;
        $("#offer2id").append(secondLastOfferId);
        return secondLastOfferId ;
    }).then(function(secondLastOfferId) {
        return exchangeContract.getOwner(secondLastOfferId);
    }).then(function(owner2) {
        $("#offer2owner").append(owner2);
        return exchangeContract.isActive(secondLastOfferId);
    }).then(function(bool) {
        if (bool === true) $("#offer2active").append("Active");
        else {
            $("#offer2active").append("Inactive");
            return
        }
    })
}, 1000);

var offer555;
//Exploring functions
setTimeout(function() {
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        testContract = instance;
        return instance;
    }).then(function(instance) {
        console.log('L69 Instance of the contract', instance);
        return instance.getLastOfferId();
    }).then(function(lastOffer) {
        console.log("L72 Last offer id returns : ", lastOffer.toNumber());
        // lastId = lastOffer.c[0];
        lastId = lastOffer.toNumber();
        return lastId;
    }).then(function(){
        return testContract.allEvents();
    }).then(function(allEvents) {
        console.log("L79 All events ", allEvents);
        return;
    }).then(function() {
        return testContract.getOffer(lastId);
    }).then(function(offer) {
        console.log("L84 Offer 555? ", offer);
        offer555 = offer;
        return offer;
    }).then(function(){
        return Asset.at(offer555[1]) // bigNumber error here when use offer555[3] (for eth token)
    }).then(function(asset) {
        console.log('L90 Contract Asset instantiated at offer555[1]', asset);
        return asset.name();
    }).then(function(name) {
        console.log('L93 Name of the token offered : ', name);
    })
}, 1000);

console.log("Welcome to Melon Challenge");
console.log("Exchange protocole : ", Exchange);

