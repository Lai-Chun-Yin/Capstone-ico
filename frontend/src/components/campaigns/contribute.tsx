import axios from "axios";
import * as React from "react";
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { Button, Card, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import web3 from '../../ethereum/web3';
import { IRootState } from "../../reducers";


// interface IContributeFormState {
//   value: string | null;
//   errorMessage: string | null;
//   loading: boolean | null;
//   campaign: CapstoneICO.ICampaign | null;
// }

interface IFormProps {
  campaigns: CapstoneICO.ICampaign[];
  match: match<ICampaignIdPathParam>;
}
interface IFormState {
  fromAddress: string;
  toAddress: string | null;
  balance: string | null;
  value: string;
  receipt: object;
  campaign: CapstoneICO.ICampaign | null;
}
interface ICampaignIdPathParam {
  campaignId: number
}

class ContributeForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    const targetCampaign = props.campaigns.filter((campaign) => campaign.id === (+props.match.params.campaignId))
    this.state = {
      fromAddress: '',
      toAddress: '',
      balance: null,
      value: '',
      receipt: {},
      campaign: targetCampaign[0],
    };
  }

  public async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) {
      const balance = await web3.eth.getBalance(accounts[0]);
      this.setState({
        balance: web3.utils.fromWei(balance, 'ether'),
        fromAddress: accounts[0],
      })
    }

    this.setState({
      toAddress: (this.state.campaign ? this.state.campaign.token_address : null)
    });

    if (!this.state.campaign) {
      const token = localStorage.getItem('token');
      await this.fetchCampaign(token);
    }
    console.log(this.state.campaign);
  }

  public render() {
    const accountBalance = (this.state.balance ?
      <CardText>Account Balance: {this.state.balance} ether</CardText>
      : <CardText>Please install metamask in order to contribute!</CardText>);

    let form;
    if (this.state.campaign) {
      form = (
        <Row>
          <Col sm="6">
            <Card body={true}>
              <CardImg top={true} width="100%" src="" />
              <CardTitle>Contribute to {this.state.campaign.title}</CardTitle>
              <CardSubtitle>From: {this.state.fromAddress}</CardSubtitle>
              {/* <CardText>Account Balance: {this.state.balance} ether</CardText> */}
              {accountBalance}
              <br />
              <CardText>To: {this.state.campaign.token_address}</CardText>
              <div>
                {/* <input name='pay' value={this.state.value} onChange={this.handleValueChg} /> */}
                <InputGroup name='pay' >
                  <Input placeholder="" value={this.state.value} onChange={this.handleValueChg} />
                  <InputGroupAddon addonType="append">ether</InputGroupAddon>
                </InputGroup>
                <Button onClick={this.handleSendEther}>Send Ether</Button>
              </div>
            </Card>
          </Col>
          <Col sm="6">
            <Card body={true}>
              <CardTitle>Receipt: </CardTitle>
              <CardText>
                <ul>{Object.keys(this.state.receipt).map((value, k) => (
                  <li className='list-receipt-item'>{k} {value} ---> {this.state.receipt[value]}</li>
                ))}</ul>
              </CardText>
            </Card>
          </Col>
        </Row>
      )
    } else {
      form = null
    }

    return (
      <React.Fragment>
        <div>{form}</div>
      </React.Fragment>
    );
  }

  private handleValueChg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
  }

  private handleSendEther = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const self = this;
    const accounts = await web3.eth.getAccounts();
    this.setState({
      fromAddress: accounts[0]
    });
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

  private async fetchCampaign(token: string | null) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/campaign/${this.props.match.params.campaignId}`,
        { headers: { Authorization: `Bearer ${token}` } });
      this.setState({
        campaign: result.data[0]
      })
    } catch (err) {
      console.log(err);
    }
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    campaigns: state.campaign.campaigns
  }
};

export default connect(mapStateToProps)(ContributeForm);