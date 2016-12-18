// loadScript('/Users/sam/Dropbox/PhD/Programming/Ethereum-learning-/offchain.js')


// functions
function listenAll(aContract){
  var events = aContract.allEvents();
  events.watch(function(error, event){
      if (error) {
          console.log("Error: " + error);
      } else {
          console.log(event.event + ": " + JSON.stringify(event.args));
      }
  });
}
// parameters
var orig = eth.accounts[1];
var p = '';
// address / abis
personal.unlockAccount(orig,p);
var buyerAddr = '0xC3Eb897b3fD82c905Ab976F6b84de4370094680D';
var seller1Addr = '0x0C04e5649986d334F56912B6787223F90732d2Ab';
var seller2Addr = '0xcAF4FA8F389e6Ffc50a4D7DeF12F2f33161a2fE5';
var buyerABI = [ { "constant": true, "inputs": [], "name": "anInteger", "outputs": [ { "name": "", "type": "uint256", "value": "3" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "taskDone", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "originator", "outputs": [ { "name": "", "type": "address", "value": "0x99502c33a26e7cdc0afd9070aa1054ae3d5a9de9" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_price", "type": "uint256" }, { "name": "_first", "type": "uint256" }, { "name": "_second", "type": "uint256" } ], "name": "setParams", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "offerPrice", "type": "uint256" }, { "name": "result", "type": "uint256" }, { "name": "first", "type": "uint256" }, { "name": "second", "type": "uint256" } ], "name": "computeForMoney", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "load", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "anotherInteger", "outputs": [ { "name": "", "type": "uint256", "value": "4" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "remove", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "taskSpecs", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "satisfactory", "type": "bool" }, { "name": "aSellerAddr", "type": "address" } ], "name": "rateService", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "creationTime", "outputs": [ { "name": "", "type": "uint256", "value": "1482059560" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPrice", "outputs": [ { "name": "", "type": "uint256", "value": "654321" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "_price", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;price", "template": "elements_input_uint", "value": "654321" }, { "name": "_first", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;first", "template": "elements_input_uint", "value": "3" }, { "name": "_second", "type": "uint256", "index": 2, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;second", "template": "elements_input_uint", "value": "4" } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "BuyerFundingReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "OfferReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "OfferAccepted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "result", "type": "uint256" } ], "name": "SolutionReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "MoneyPaidOut", "type": "event" } ]
var sellerABI = [ { "constant": false, "inputs": [ { "name": "aBuyerAddr", "type": "address" }, { "name": "offerPrice", "type": "uint256" }, { "name": "result", "type": "uint256" }, { "name": "first", "type": "uint256" }, { "name": "second", "type": "uint256" } ], "name": "makeOffer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "pay", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [], "name": "rateService", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "originator", "outputs": [ { "name": "", "type": "address", "value": "0x99502c33a26e7cdc0afd9070aa1054ae3d5a9de9" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "previousInterlocutors", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "rating", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "remove", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "creationTime", "outputs": [ { "name": "", "type": "uint256", "value": "1482059618" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "interlocutor", "type": "address" }, { "indexed": false, "name": "newRating", "type": "uint256" } ], "name": "RatingReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "interlocutor", "type": "address" }, { "indexed": false, "name": "newRating", "type": "uint256" } ], "name": "MoneyReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "OfferAccepted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "OfferRejected", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "SellerReceived", "type": "event" } ]
// preferences parameters
var preferences = 654321;
var int1 = 3, int2 = 4;
var price1 = 660000;
var loadingAmnt = 200000000000;
// contracts classes
var buyerContract = eth.contract(buyerABI);
var sellerContract = eth.contract(sellerABI);
// contracts instances
var buyer = buyerContract.at(buyerAddr);
var seller1 = sellerContract.at(seller1Addr);
var seller2 = sellerContract.at(seller1Addr);
// listen to events
var contracts = [buyer, seller1, seller2];
// for (x in contracts){listenAll(contracts[x]);}

// main
buyer.load.sendTransaction({from: eth.accounts[1], value: loadingAmnt, gas: 40000})
buyer.setParams.sendTransaction(preferences, int1, int2, {from: eth.accounts[1], gas: 40000})
setTimeout(function() {
  var sum = int1+int2;
  seller1.makeOffer.sendTransaction(buyerAddr, price1, sum, int1, int2, {from: eth.accounts[1], gas:50000})
  setTimeout(function(){
    console.log(buyer.taskDone.call());
    if (buyer.taskDone.call() != true){
      price1 -= Math.ceil(Math.random()*50000);
      console.log('new price:', price1);
      seller1.makeOffer.sendTransaction(buyerAddr, price1, sum, int1, int2, {from: eth.accounts[1], gas:50000})
    }
  }, 4000);
}, 1500);




//
