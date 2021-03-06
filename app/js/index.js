var exchangeContract;
var lastOfferId;
var secondLastOfferId;
var offer1;
var offer2;
var testContract;

//user info
setTimeout(function() {
    var userAddress = web3.eth.accounts[0];
    $("#useraddress").append(userAddress);
    web3.eth.getBalance(userAddress, function(err, res) {
        if (!err) {
            $("#userbalance").append(web3.fromWei(res, "ether").toNumber() + " ETH");
        } else {
            console.log(err);
        }
    })
}, 1000);

//Last offer - #554  
setTimeout(function() {
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        exchangeContract = instance;
        return instance;
    }).then(function(instance) {
        return instance.getLastOfferId();
    }).then(function(lastOffer) {
        lastOfferId = lastOffer.toNumber();
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
        }
        return exchangeContract.getOffer(lastOfferId);
    }).then(function(offer) {
        offer1 = offer;
        return Asset.at(offer1[3])
    }).then(function(asset) {
        return asset.name();
    }).then(function(name) {
        $("#offer1buy").append(name);
        $("#offer1buyprice").append(offer1[2] / (Math.pow(10, 18))); //TODO get decimals directly from contract
        return Asset.at(offer1[1])
    }).then(function(asset) {
        return asset.name();
    }).then(function(name) {
        $("#offer1sell").append(name);
        $("#offer1sellprice").append(offer1[0] / (Math.pow(10, 8))); //TODO get decimals directly from contract
    }).catch(function(e) {
        console.log(e);
    })
}, 100);

//Second last offer -- #554
setTimeout(function() {
    Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
        exchangeContract = instance;
        return instance;
    }).then(function(instance) {
        return instance.getLastOfferId();
    }).then(function(lastOffer) {
        secondLastOfferId = lastOffer.toNumber() - 1;
        $("#offer2id").append(secondLastOfferId);
        return secondLastOfferId;
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
        return exchangeContract.getOffer(secondLastOfferId)
    }).then(function(offer) {
        offer2 = offer;
        if (offer2 == undefined) {
            $("#offer2buy").append("N/A");
            $("#offer2buyprice").append("N/A");
            $("#offer2sell").append("N/A");
            $("#offer2sellprice").append("N/A");
        } else {
            Asset.at(offer2[3]).then(function(asset) {
                return asset.name();
            }).then(function(name) {
                $("#offer2buy").append(name);
                $("#offer2buyprice").append(offer2[2] / (Math.pow(10, 18)));
                return Asset.at(offer2[1])
            }).then(function(asset) {
                return asset.name();
            }).then(function(name) {
                $("#offer2sell").append(name);
                $("#offer2sellprice").append(offer2[1] / (Math.pow(10, 18)));
            }).catch(function(e) {
                console.log(e);
            })
        }
    }).catch(function(e) {
        console.log(e);
    })
}, 100);


function makeOffer() {
    var buy = $("#buytokens").val();
    var buyqty = $("#buyqty").val();
    var sell = $("#selltokens").val();
    var sellqty = $("#sellqty").val();
    var buyToken, sellToken
    switch (buy) {
        case "Ether Token":
            buyToken = "0xb5f354c280fe7e559237ea7b3b56ae220ef0b801";
            break;
        case "Bitcoin Token":
            buyToken = "0xc652820b99552127d1e06373d8640e0f93da9477";
            break;
    }

    switch (sell) {
        case "Ether Token":
            sellToken = "0xb5f354c280fe7e559237ea7b3b56ae220ef0b801";
            break;
        case "Bitcoin Token":
            sellToken = "0xc652820b99552127d1e06373d8640e0f93da9477";
            break;
    }

    // Exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
    //     exchangeContract = instance;
    //     return instance;
    // }).then(function(instance) {
    //     return instance.offer(sellqty, sellToken, buyqty, buyToken);
    // }).then(function(res) {
    //     console.log(res);
    // }).catch(function(e) {
    //     console.log(e);
    // })

    console.log("Offer originator wants to buy ", buyToken, " and wants to sell ", sellToken);
    alert("Sorry, the magic stops here. The buy/sell functionnality is under construction. Please come back later.")

}

console.log("Welcome to the Melon Challenge");
