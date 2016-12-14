// Some GETH helper functions... mostly a wip.                                //
////////////////////////////////////////////////////////////////////////////////





function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in eth.accounts) {
        var acct = eth.accounts[acctNum];
        var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
        totalBal += parseFloat(acctBal);
        console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
    }
    console.log("  Total balance: " + totalBal + " ether");
};


// For an external party (a contract or external entity), to watch:
// Coin.Sent().watch({}, '', function(error, result) {
//     if (!error) {
//         console.log("Coin transfer: " + result.args.amount +
//             " coins were sent from " + result.args.from +
//             " to " + result.args.to + ".");
//         console.log("Balances now:\n" +
//             "Sender: " + Coin.balances.call(result.args.from) +
//             "Receiver: " + Coin.balances.call(result.args.to));
//     }
// }


// // create a no-parameter contract
// function ContractMaker(source, name){
//   var compiled = eth.compile.solidity(source);
//   console.log(compiled)
//   var inter = compiled[name]
//   // var contract = eth.contract(inter.info.abiDefinition);
//   // return contract.new({from:eth.accounts[0],data:compiled.name.code, gas: 1000000})
//   // console.log(contract);
// }

/*
var event = tom.PriceProposalReceived({}, '', function(error, result){
  if (!error)
  console.log('some event')
});
*/
// var Multiply7 = eth.contract(contract.info.abiDefinition);
// var myMultiply7 = Multiply7.at(address);
// geth --testnet --rpc --rpcapi="db,eth,net,web3,personal" --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "localhost" console 2>> tdlog.txt
// geth --testnet console 2>> tdlog.txt
// eth.sendTransaction({from: '0x036a03fc47084741f83938296a1c8ef67f6e34fa', to: '0xa8ade7feab1ece71446bed25fa0cf6745c19c3d5', value: web3.toWei(1, "ether")})


// loadScript('/Users/sam/Dropbox/PhD/contract2/ethHelpers.js')
