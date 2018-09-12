const mnemonic = "express clean uncover tumble strike account crush paddle whale cushion film pioneer";
const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/e090ab77bbe446e597ee121b9e4e2cc0');

module.exports = provider