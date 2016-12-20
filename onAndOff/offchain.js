// loadScript('/Users/sam/Dropbox/PhD/Programming/Ethereum-learning-/onAndOff/offchain.js')

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
var p = 'ethdev';

// abis
var buyerABI =[ { "constant": true, "inputs": [], "name": "anInteger", "outputs": [ { "name": "", "type": "uint256", "value": "2" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "taskDone", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "originator", "outputs": [ { "name": "", "type": "address", "value": "0xed7306951a5d2493a047f76253c4c0cf2bd0bac3" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_price", "type": "uint256" }, { "name": "_first", "type": "uint256" }, { "name": "_second", "type": "uint256" } ], "name": "setParams", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_offerPrice", "type": "uint256" }, { "name": "_result", "type": "uint256" }, { "name": "_first", "type": "uint256" }, { "name": "_second", "type": "uint256" } ], "name": "computeForMoney", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_done", "type": "bool" } ], "name": "setTaskDone", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "load", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "anotherInteger", "outputs": [ { "name": "", "type": "uint256", "value": "3" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "remove", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "taskSpecs", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_satisfactory", "type": "bool" }, { "name": "_aSellerAddr", "type": "address" } ], "name": "rateService", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPrice", "outputs": [ { "name": "", "type": "uint256", "value": "65400" } ], "payable": false, "type": "function" }, { "inputs": [ { "name": "_price", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;price", "template": "elements_input_uint", "value": "65400" }, { "name": "_first", "type": "uint256", "index": 1, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;first", "template": "elements_input_uint", "value": "2" }, { "name": "_second", "type": "uint256", "index": 2, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;second", "template": "elements_input_uint", "value": "3" } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "BuyerFundingReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "OfferReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "OfferAccepted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "OfferRejected", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "result", "type": "uint256" } ], "name": "SolutionReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "MoneyPaidOut", "type": "event" } ]
var sellerABI = [ { "constant": false, "inputs": [ { "name": "_aBuyerAddr", "type": "address" }, { "name": "_offerPrice", "type": "uint256" }, { "name": "_result", "type": "uint256" }, { "name": "_first", "type": "uint256" }, { "name": "_second", "type": "uint256" } ], "name": "makeOffer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "rateServiceUp", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "pay", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "_yes", "type": "bool" } ], "name": "offerAccepted", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "originator", "outputs": [ { "name": "", "type": "address", "value": "0xed7306951a5d2493a047f76253c4c0cf2bd0bac3" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "lastClientResponse", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "previousInterlocutors", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "rating", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "remove", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getLastAns", "outputs": [ { "name": "_r", "type": "bool" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "interlocutor", "type": "address" }, { "indexed": false, "name": "newRating", "type": "uint256" } ], "name": "RatingReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "monies", "type": "uint256" } ], "name": "MoneyReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "OfferAccepted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "price", "type": "uint256" } ], "name": "OfferRejected", "type": "event" } ]
// addresses
personal.unlockAccount(orig,p);
var buyerAddr = '0x11F9BC35C58FA072d641a85528b81A67aD0b7Ccd';
var seller1Addr = '0xaf543DE89bCB84607Faa896793e6B8BD6E20dB82';
var seller2Addr = '0x3c85FA444eA39D757826668A26b85376c51Fe82a';
// preferences parameters
var preferences = 6540000;
var int1 = 3, int2 = 4;
var price1 = 6600000;
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


//
// var event = token.CoinTransfer({}, '', function(error, result){
//   if (!error)
//     console.log("Coin transfer: " + result.args.amount + " tokens were sent. Balances now are as following: \n Sender:\t" + result.args.sender + " \t" + token.coinBalanceOf.call(result.args.sender) + " tokens \n Receiver:\t" + result.args.receiver + " \t" + token.coinBalanceOf.call(result.args.receiver) + " tokens" )
// });
//
//


// main
buyer.load.sendTransaction({from: eth.accounts[1], value: loadingAmnt, gas: 40000})
buyer.setParams.sendTransaction(preferences, int1, int2, {from: eth.accounts[1], gas: 40000})
setTimeout(function() {
  // perform computation
  var sum = int1+int2;
  // make a first offer
  console.log('Initial price (seller):', price1);
  seller1.makeOffer.sendTransaction(buyerAddr, price1, sum, int1, int2, {from: eth.accounts[1], gas:110000})
  // make second offer
  setTimeout(function(){
     if (seller1.getLastAns.call() != true){
      price1 -= Math.ceil(Math.random()*500000);
      console.log('New price (seller):', price1);
      seller1.makeOffer.sendTransaction(buyerAddr, price1, sum, int1, int2, {from: eth.accounts[1], gas:110000})
    }
  }, 10000);
}, 1500);




//
