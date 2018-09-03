import * as React from 'react';
import web3 from '../ethereum/web3';

// const accounts = await web3.eth.getAccounts();

interface ISomeState {
  fromAddress: string;
  toAddress: string;
  value: string;
  receipt: object;
}

class TestWeb3 extends React.Component<{}, ISomeState> {
  constructor({}) {
    super({});
    this.state = {
      fromAddress: '',
      toAddress: '',
      value: '',
      receipt: {}
    };
  }

  public render() {
    return (
      <div>
        <button onClick={this.doThis}>Show Address.</button>
        <p>From: {this.state.fromAddress}</p>
        <p>To: {this.state.toAddress}</p>
        <br/>
        <input name='toAddress' value={this.state.toAddress} onChange={this.doThat2} /><br />
        <input name='pay' value={this.state.value} onChange={this.doThat} />
        <button onClick={this.handleClick}>Send Ether</button>
        <br />
        <br  />
        <p>Receipt: </p>
        <ul>{Object.keys(this.state.receipt).map((value, k) => (
          <li className='list-receipt-item'>{k} {value} ---> {this.state.receipt[value]}</li>
        ))}</ul>
      </div>
    );
  }

  private doThis = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ fromAddress: accounts[0] });
  }

  private doThat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
  }

  private doThat2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toAddress = e.currentTarget.value;
    this.setState({ toAddress });
  }

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const self = this;
    web3.eth.sendTransaction({
      from: this.state.fromAddress,
      to: this.state.toAddress,
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    .then((receipt: any) => {
      self.setState({ receipt })
      console.log(self.state.receipt)
    })
  }
}

export default TestWeb3
