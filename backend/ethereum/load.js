const Provider = require('../provider');

const Web3 = require("web3");
const web3 = new Web3(Provider);

const contract = require('truffle-contract');
let TokenContract = require('./build/Token.json');

let loadToken = contract(TokenContract);
loadToken.setProvider(Provider);

(async () => {
  // const newAccount1 = await web3.eth.accounts.create();
  // let keystore1 = newAccount1.encrypt('passcode');  // encrypt ---> generate keystore
  // console.log('Account 1:', newAccount1);
  // console.log('Keystore 1:', keystore1);
  // let pk = web3.eth.accounts.decrypt(keystore1, 'passcode');
  // console.log('Decrypted keystore --> private key:', pk)

  const accounts = await web3.eth.getAccounts();

  // set contract owner address
  // must use lowercase or will get "private key should be a Buffer" error
  loadToken.defaults({from: accounts[0].address.toLowerCase()});

  // load an existing contract on the network
  let deployed = await loadToken.at('0xcd83F32f547a8Ed75D00bFFf17bBDFd64FAb0Bd8');

  let owner = await deployed.owner();
  console.log('Contract owner:', owner);

  let balance = await deployed.balanceOf(newAccount2.address);
  console.log('Balance of genesis address: ', balance);

  // let newContractAddress = await deployed.this();
  // console.log('Address of newly deployed token', newContractAddress);
})()
