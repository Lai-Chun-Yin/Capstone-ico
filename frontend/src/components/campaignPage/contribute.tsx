import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import * as History from "history";
import * as React from "react";
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { Button, Card, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import web3 from '../../ethereum/web3';
import { IRootState } from "../../reducers";
import * as Authactions from "../../reducers/auth/actions";
import { getCampaign } from "../../services/campaignService";


// interface IContributeFormState {
//   value: string | null;
//   errorMessage: string | null;
//   loading: boolean | null;
//   campaign: CapstoneICO.ICampaign | null;
// }

interface IFormProps {
  isAuthenticated: boolean;
  campaigns: CapstoneICO.ICampaign[];
  match: match<ICampaignIdPathParam>;
  history: History.History;
  onSetAuthRedirectPath: (path: any) => void;
}
interface IFormState {
  fromAddress: string;
  toAddress: string | null;
  balance: string | null;
  value: string;
  receipt: object;
  campaign: CapstoneICO.ICampaign | null;
  // below is for prevent breaking mechanism
  dialog: any;
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
      dialog: {
        problem: null,
        dialogOpen: false
      }
    };
  }

  public componentDidMount = async () => {
    if (!this.props.isAuthenticated) { this.onNotLogIn(); }
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) {
      const balance = await web3.eth.getBalance(accounts[0]);
      this.setState({
        balance: web3.utils.fromWei(balance, 'ether'),
        fromAddress: accounts[0],
      })
    } else if (accounts.length === 0) {
      this.onNoAddress(); return;
    }

    this.setState({
      toAddress: (this.state.campaign ? this.state.campaign.token_address : null)
    });

    if (!this.state.campaign) {
      await getCampaign(this.props.match.params.campaignId);
    }
    console.log(this.state.campaign);
  }

  public render() {
    const accountBalance = (this.state.balance ?
      <CardText>Account Balance: {this.state.balance} ether</CardText>
      : <CardText>Please install metamask in order to contribute!</CardText>);

    let form;
    if (this.state.campaign) {
      let equivalentTokenMessage = null;
      if (this.state.value) {
        equivalentTokenMessage =
          <CardText>You are investing {this.state.value} Ether in exchange for {(+this.state.campaign.conversion_ratio) * (+this.state.value)} Tokens of supported campaign.</CardText>
      }
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
                {equivalentTokenMessage}
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

    let problemMessage = "";
    if (this.state.dialog.problem === "noAddress") {
      problemMessage = "Cannot find any addresses. Please make sure Metamask is loaded."
    }
    else if (this.state.campaign && this.state.dialog.problem === "notLogIn") {
      problemMessage = "Please log in to continue."
    }

    return (
      <React.Fragment>
        <div>{form}</div>

        <Dialog open={this.state.dialog.dialogOpen} onClose={this.handlePageClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {problemMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePageClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  private handleValueChg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
  }

  private handleSendEther = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const accounts = await web3.eth.getAccounts();
    const amount = Number(this.state.value);
    this.setState({
      fromAddress: accounts[0]
    });
    const receipt = await web3.eth.sendTransaction({
      from: this.state.fromAddress,
      to: this.state.toAddress,
      value: web3.utils.toWei(this.state.value, 'ether')
    })
      
    this.setState({ receipt });
    const block = await web3.eth.getBlock(receipt.blockHash);
    const txDate = (new Date(block.timestamp*1000)).toISOString();
    const txHash = receipt.transactionHash;
    const token = localStorage.getItem('token');
    if (this.state.campaign) {
      await this.postTransaction(txDate, amount, txHash, this.state.campaign.id, token);
    }
  }

  private async postTransaction(date:string,amount:number,txHash:string, campaignId:number, token: string | null) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/transaction`,
        {date, amount, txHash, campaignId},   // transaction as JSON object
        { headers: { Authorization: `Bearer ${token}` } });
      this.setState({
        campaign: result.data[0]
      })
    } catch (err) {
      console.log(err);
    }
  }

  private onNotLogIn = () => {
    this.setState({
      dialog: {
        problem: "notLogIn",
        dialogOpen: true
      }
    })
  }
  private onNoAddress = () => {
    this.setState({
      dialog: {
        problem: "noAddress",
        dialogOpen: true
      }
    })
  }
  private handlePageClose = () => {
    if (this.state.dialog.problem === "noAddress") {
      this.props.history.goBack();
    }
    else if (this.state.campaign && this.state.dialog.problem === "notLogIn") {
      this.props.onSetAuthRedirectPath(`/campaign/details/${this.state.campaign.id}/contribute`);
      this.props.history.push("/login")
    }
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    campaigns: state.campaign.campaigns
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetAuthRedirectPath: (path: any) => dispatch(Authactions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContributeForm);