const Provider = require("../provider");

const Web3 = require("web3");
const web3 = new Web3(Provider);

const contract = require("truffle-contract");
let TokenContract = require("./build/Token.json");

let newToken = contract(TokenContract);
newToken.setProvider(Provider);

module.exports = async (metrics) => { // argument is an object comprised of token metrics
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("deploying contract from", accounts[0]);
    // set contract owner address
    // must use lowercase or will get "private key should be a Buffer" error
    newToken.defaults({ from: accounts[0].toLowerCase() });

    // deploy a new version of this contract to the network
    console.log("arguments", JSON.stringify(metrics));
    let deployed = await newToken.new(
      metrics.symbol,
      metrics.name,
      metrics.decimal,
      metrics.total_supply,
      metrics.genesis_address
    );

    let owner = await deployed.owner();
    console.log("Contract owner:", owner);

    let balance = await deployed.balanceOf(metrics.genesis_address);
    console.log("Balance of genesis address: ", balance);

    let newContractAddress = await deployed.retrieveContractAddress();
    console.log("Address of newly deployed token", newContractAddress);
    return newContractAddress;
  } catch (err) {
    console.log("error launching token: ", err);
  }
};
