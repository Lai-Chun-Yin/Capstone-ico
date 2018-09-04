// tslint:disable-next-line:no-var-requires
const Web3 = require('web3');

let web3:any;

if (typeof window !== "undefined" && typeof (window as any).web3 !== "undefined") {
  // we are in the browser and metamask is running.
  web3 = new Web3((window as any).web3.currentProvider);
} else {
  // we are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/4ea78ae802fa4b99b10ac6c933649dd8"
  );
  web3 = new Web3(provider);
}

export default web3;
