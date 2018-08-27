var Web3 = require('web3');
var util = require('ethereumjs-util');
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var solc = require('solc');

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/CF0hhTkBMfb9deEWlCHw')
);

var address = '0xC6a55B4184Ca938c472FC7a7692009C65D1c2a6c';
var key = '37d73f8a20cc898ec669687129c73468974530c1717b382b6d13318f55ef48b5';


const input = {
    'tokencreation.sol': fs.readFileSync('tokencreation.sol').toString()
};

function findImports(path) {
    return {
        'contents': fs.readFileSync(path).toString()
    }
}

let compiledContract = solc.compile({sources: input}, 1, findImports);

//console.log(compiledContract);
let abi = compiledContract.contracts['tokencreation.sol:Token'].interface;
let bytecode = compiledContract.contracts['tokencreation.sol:Token'].bytecode;

let deploy = async () => {
    var myContract = await new web3.eth.Contract(JSON.parse(abi));
    var hexdata = (await myContract.deploy({
        data: '0x' + bytecode,
        arguments: ["FOOD", "Food Token", 5, 10000, address]    
    })).encodeABI()
    return hexdata;
}

var rawTx = async () => {
    let deployedhexdata = await deploy();
    let nonce = await web3.eth.getTransactionCount(address);
    let gaslimit = (await web3.eth.getBlock("latest")).gasLimit;
    let gasprice = Number(await web3.eth.getGasPrice()) * 20;
    
    return {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasprice),
        gasLimit: web3.utils.toHex(gaslimit),
        data: deployedhexdata
    }
}

async function sendRaw(rawTx) {
    let rawtx = await rawTx();
    //console.log(rawtx)
    var privateKey = new Buffer(key, 'hex');
    var transaction = new Tx(rawtx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');        
    console.log('0x' + serializedTx);
    web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', console.log).catch(err => console.log(err));
}

sendRaw(rawTx);    