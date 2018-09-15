import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as History from "history";
import * as React from "react";
import { connect } from "react-redux";
import { match } from "react-router-dom";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import {
  Button,
  Card,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import LinearIndeterminate from "../../components/loading";
import web3 from "../../ethereum/web3";
import { IRootState } from "../../reducers";
import * as Authactions from "../../reducers/auth/actions";
import {
  getCampaign,
  getCampaignBalance
} from "../../services/campaignService";
import { postTransaction } from "../../services/transactionService";

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
  reloadCampaign: () => void;
}
interface IFormState {
  fromAddress: string;
  toAddress: string | null;
  userBalance: string | null;
  campaignBalance: number;
  value: string;
  receipt: object | null;
  campaign: CapstoneICO.ICampaign | null;
  // below is for prevent breaking mechanism
  dialog: any;
  loading: boolean;
  errorMessage: string;
}
interface ICampaignIdPathParam {
  campaignId: number;
}

class ContributeForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    const targetCampaign = props.campaigns.filter(
      campaign => campaign.id === +props.match.params.campaignId
    );
    this.state = {
      fromAddress: "",
      toAddress: "",
      userBalance: null,
      campaignBalance: 0,
      value: "",
      receipt: null,
      campaign: targetCampaign[0],
      dialog: {
        problem: null,
        dialogOpen: false
      },
      loading: false,
      errorMessage: ""
    };
  }

  public componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) {
      const userBalance = await web3.eth.getBalance(accounts[0]);
      this.setState({
        userBalance: web3.utils.fromWei(userBalance, "ether"),
        fromAddress: accounts[0]
      });
    } else if (accounts.length === 0) {
      this.onNoAddress();
      return;
    }

    if (!this.state.campaign) {
      const result1 = await getCampaign(this.props.match.params.campaignId);
      const result2 = await getCampaignBalance(
        this.props.match.params.campaignId
      );
      this.setState({
        campaign: result1.data[0],
        campaignBalance: result2.data.length ? result2.data[0].sum : 0
      });
    }

    this.setState({
      toAddress: this.state.campaign ? this.state.campaign.token_address : null
    });

    if (!this.props.isAuthenticated) {
      this.onNotLogIn();
    }
  };

  public render() {
    const userBalance = this.state.userBalance ? (
      <CardText>Account Balance: {this.state.userBalance} ether</CardText>
    ) : (
      <CardText>Please install metamask in order to contribute!</CardText>
    );

    const successMessage = this.state.receipt ? (
      <h3>
        <p className="text-success">Transaction confirmed!</p>
      </h3>
    ) : (
      <div />
    );

    let form;
    if (this.state.campaign) {
      let equivalentTokenMessage = null;
      if (this.state.value) {
        equivalentTokenMessage = (
          <CardText>
            You are investing {this.state.value} Ether in exchange for{" "}
            {+this.state.campaign.conversion_ratio * +this.state.value} Tokens
            of supported campaign.
          </CardText>
        );
      }
      form = (
        <Row>
          <Col sm="8">
            <Card body={true}>
              <CardImg top={true} width="100%" src="" />
              <CardTitle>Contribute to {this.state.campaign.title}</CardTitle>
              <CardSubtitle>From: {this.state.fromAddress}</CardSubtitle>
              {/* <CardText>Account Balance: {this.state.userBalance} ether</CardText> */}
              {userBalance}
              <br />
              <CardText>To: {this.state.campaign.token_address}</CardText>
              <div>
                {/* <input name='pay' value={this.state.value} onChange={this.handleValueChg} /> */}
                <InputGroup name="pay">
                  <Input
                    placeholder=""
                    value={this.state.value}
                    onChange={this.handleValueChg}
                  />
                  <InputGroupAddon addonType="append">ether</InputGroupAddon>
                </InputGroup>
                {equivalentTokenMessage}
                {this.state.loading ? (
                  <div className="mb-2">
                    <LinearIndeterminate />
                  </div>
                ) : (
                  <p className="text-danger">{this.state.errorMessage}</p>
                )}
                <Button
                  onClick={this.handleSendEther}
                  disabled={this.state.loading}
                >
                  Send Ether
                </Button>
                {successMessage}
              </div>
            </Card>
          </Col>
        </Row>
      );
    } else {
      form = null;
    }

    let problemMessage = "";
    if (this.state.dialog.problem === "noAddress") {
      problemMessage =
        "Cannot find any addresses. Please make sure Metamask is loaded.";
    } else if (
      this.state.campaign &&
      this.state.dialog.problem === "notLogIn"
    ) {
      problemMessage = "Please log in to continue.";
    }

    let problemDialog;
    if (problemMessage !== "") {
      problemDialog = (
        <Dialog
          open={this.state.dialog.dialogOpen}
          onClose={this.handlePageClose}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>{problemMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePageClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      problemDialog = <div />;
    }

    return (
      <React.Fragment>
        <div>{form}</div>
        {problemDialog}
      </React.Fragment>
    );
  }

  private handleValueChg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.setState({ value });
  };

  private handleSendEther = async (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      loading: true,
      errorMessage: ""
    });

    if (this.state.campaign) {
      const remainingCap =
        this.state.campaign.hard_cap - this.state.campaignBalance;
      if (Number(this.state.value) > remainingCap) {
        this.setState({
          errorMessage: `Maximum possible contribution is ${String(
            remainingCap
          )} ether`,
          loading: false
        });
        return;
      }
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const amount = Number(this.state.value);
      this.setState({
        fromAddress: accounts[0]
      });
      const receipt = await web3.eth.sendTransaction({
        from: this.state.fromAddress,
        to: this.state.toAddress,
        value: web3.utils.toWei(this.state.value, "ether")
      });

      this.setState({ receipt });
      const block = await web3.eth.getBlock(receipt.blockHash);
      const txDate = new Date(block.timestamp * 1000).toISOString();
      const txHash = receipt.transactionHash;
      const token = localStorage.getItem("token");
      if (this.state.campaign) {
        await postTransaction(
          txDate,
          amount,
          txHash,
          this.state.campaign.id,
          token
        );
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  private onNotLogIn = () => {
    this.setState({
      dialog: {
        problem: "notLogIn",
        dialogOpen: true
      }
    });
  };
  private onNoAddress = () => {
    this.setState({
      dialog: {
        problem: "noAddress",
        dialogOpen: true
      }
    });
  };
  private handlePageClose = () => {
    if (this.state.dialog.problem === "noAddress") {
      this.props.history.goBack();
    } else if (
      this.state.campaign &&
      this.state.dialog.problem === "notLogIn"
    ) {
      this.props.onSetAuthRedirectPath(
        `/campaign/details/${this.state.campaign.id}/contribute`
      );
      this.props.history.push("/login");
    } else if (
      this.state.campaign &&
      this.state.dialog.problem === "notLogIn"
    ) {
      this.props.onSetAuthRedirectPath(
        `/campaign/${this.state.campaign.id}/contribute`
      );
      this.props.history.push("/login");
    }
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    campaigns: state.campaign.campaigns
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetAuthRedirectPath: (path: any) =>
      dispatch(Authactions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributeForm);
