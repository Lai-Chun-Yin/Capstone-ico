const mnemonic = "express clean uncover tumble strike account crush paddle whale cushion film pioneer";
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/e090ab77bbe446e597ee121b9e4e2cc0')
}
