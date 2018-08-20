var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var fs = require('fs');
var solc = require('solc');

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/CF0hhTkBMfb9deEWlCHw')
);

var address = '0xC6a55B4184Ca938c472FC7a7692009C65D1c2a6c';
var key = '37d73f8a20cc898ec669687129c73468974530c1717b382b6d13318f55ef48b5';

var createToken = require('./tokencreation');
let contractString = createToken('WINE', 'Wine Token', 18, '100', '0xC6a55B4184Ca938c472FC7a7692009C65D1c2a6c');
console.log(contractString)

const input = {
    'tokencreation.sol': contractString//fs.readFileSync('tokencreation.js').toString()
};

function findImports(path) {
    return {
        'contents': fs.readFileSync(path).toString()
    }
}

let compiledContract = solc.compile({sources: input}, 1, findImports);

console.log(compiledContract);
let abi = compiledContract.contracts['tokencreation.sol:Token'].interface;
let bytecode = compiledContract.contracts['tokencreation.sol:Token'].bytecode;
//let gasEstimate = web3.eth.estimateGas({data: bytecode});
//console.log(gasEstimate);
//let MyContract = web3.eth.contract(JSON.parse(abi));

// var myContractReturned = MyContract.new(param1, param2, {
//    from:mySenderAddress,
//    data:bytecode,
//    gas:gasEstimate}, function(err, myContract){
//     if(!err) {
//        // NOTE: The callback will fire twice!
//        // Once the contract has the transactionHash property set and once its deployed on an address.

//        // e.g. check tx hash on the first call (transaction send)
//        if(!myContract.address) {
//            console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
       
//        // check address on the second call (contract deployed)
//        } else {
//            console.log(myContract.address) // the contract address
//        }

//        // Note that the returned "myContractReturned" === "myContract",
//        // so the returned "myContractReturned" object will also get the address set.
//     }
//   });

    function sendRaw(rawTx) {
        var privateKey = new Buffer(key, 'hex');
        var transaction = new tx(rawTx);
        transaction.sign(privateKey);
        var serializedTx = transaction.serialize().toString('hex');
        web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }

    var rawTx = {
        nonce: web3.toHex(web3.eth.getTransactionCount(address)),
        gasLimit: web3.toHex(3287612),
        gasPrice: web3.toHex(20000000000),
        data: '0x' + bytecode + '0000000000000000000000000000000000000000000000000000000000000005'
    };

    sendRaw(rawTx);
