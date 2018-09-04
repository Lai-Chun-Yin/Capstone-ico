// tslint:disable-next-line:no-var-requires
const Web3 = require('web3');

let web3:any;

if (typeof window !== "undefined" && typeof (window as any).web3 !== "undefined") {
  // we are in the browser and metamask is running.
  console.log('injected web3 detected');
  web3 = new Web3((window as any).web3.currentProvider);
} else {
  // we are on the server *OR* the user is not running metamask
  console.log('no injected web3, fall back to default');
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/627c89ffadac4a77ab3db8df0da9cb8d"
  );
  web3 = new Web3(provider);
}

export default web3;
