import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from "react-router-dom";
import { Button, Card, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import etherscan_img from '../../assets/images/Etherscan-rinkeby.png';
import LinearIndeterminate from '../../components/loading';
import { IRootState } from "../../reducers";
import { loadCampaignsThunk } from "../../reducers/campaigns/actions";
import { getCampaign } from "../../services/campaignService";

interface IGenerateTokenProps {
  campaigns: CapstoneICO.ICampaign[];
  isAuthenticated: boolean;
  match: match<ICampaignIdPathParam>;
  user: { [key: string]: any };
  reloadCampaign: () => void;
}
interface IGenerateTokenState {
  campaign: CapstoneICO.ICampaign | null;
  newToken: CapstoneICO.IToken | null;
  loading: boolean;
  errorMessage: string;
  disableButton: boolean;
}
interface ICampaignIdPathParam {
  campaignId: number;
}

class GenerateToken extends React.Component<IGenerateTokenProps, IGenerateTokenState> {
  constructor(props: IGenerateTokenProps) {
    super(props);
    const targetCampaign = props.campaigns.filter(
      campaign => campaign.id === +props.match.params.campaignId
    );
    this.state = {
      campaign: targetCampaign[0],
      loading: false,
      newToken: null,
      errorMessage: '',
      disableButton: false
    }
  }

  public async componentDidMount() {
    await this.props.reloadCampaign();

    if (!this.state.campaign) {
      
        const result1 = await getCampaign(this.props.match.params.campaignId);
        this.setState({
          campaign: result1.data[0]
        });
      
    }

    console.log('this.state.campaign', this.state.campaign);
  }

  public render() {
    const issuedCampaign = this.state.campaign;

    // const issuedCampaign = this.props.campaigns.filter(
    //   campaign => campaign.user_id === this.props.user.id
    // )[0];

    // console.log('\n\n\n\nthis.props Campaign', this.props.campaigns);
    // console.log('issued Campaign', this.state.issuedCampaign);

    let tokenMetrics;

    if (issuedCampaign && this.props.user.id === issuedCampaign.user_id) {
      const circulatingSupply = (100 * issuedCampaign.hard_cap * issuedCampaign.conversion_ratio / issuedCampaign.total_supply).toFixed(1);
      tokenMetrics = (
        <Row>
          <Col sm="6">
            <Card body={true}>
              <CardTitle>You are one click away from issuing your own token!</CardTitle>
              <br />
              <CardSubtitle>Project: {issuedCampaign.title}</CardSubtitle>
              <CardSubtitle>Token metrics:</CardSubtitle>
              <Row>
                <Col><CardText>Token Name: {issuedCampaign.token_name}</CardText></Col>
                <Col><CardText>Token Symbol: {issuedCampaign.token_symbol}</CardText></Col>
              </Row>
              <Row>
                <Col><CardText>Soft Cap: {issuedCampaign.soft_cap}</CardText></Col>
                <Col><CardText>Hard Cap: {issuedCampaign.hard_cap}</CardText></Col>
              </Row>
              <Row>
                <Col><CardText>Total Supply: {issuedCampaign.total_supply}</CardText></Col>
                <Col><CardText>Tokens per Eth: {issuedCampaign.conversion_ratio}</CardText></Col>
              </Row>
              <Row>
                <Col><CardText>Decimal Places: {issuedCampaign.decimal_places}</CardText></Col>
              </Row><br />
              <Row>
                <Col><CardText>Token Address: {issuedCampaign.token_address}</CardText></Col>
              </Row><br />
              <Row>
                <Col><CardText>Implied Circulating Supply % if hard cap is reached: {circulatingSupply}%</CardText></Col>
              </Row><br />
              {this.state.loading ? <LinearIndeterminate /> : <p className="text-danger">{this.state.errorMessage}</p>}
              <Button color="success" onClick={this.handleGenerateToken} disabled={this.state.disableButton}>GENERATE TOKEN</Button>
            </Card>
          </Col>

          <Col sm="6">
            {this.state.newToken ?
            (<Card body={true}>
              <CardTitle>New Token</CardTitle>
              <CardText>
                <a href={`https://rinkeby.etherscan.io/address/${this.state.newToken.token_contract}`} target="_blank">View Contract on Etherscan</a>
                <br />
                <a href={`https://rinkeby.etherscan.io/token/${this.state.newToken.token_contract}`} target="_blank">View Token on Etherscan</a>
                <p />
                <a href="https://rinkeby.etherscan.io/" target="_blank"><img src={etherscan_img} alt="etherscan-logo" title="etherscan-logo" /></a>
              </CardText>
            </Card>) : null}
          </Col>
        </Row>
      )
    } else {
      tokenMetrics = (
        <Card body={true}><CardSubtitle>You are not authorized to view this page.</CardSubtitle></Card>
      )
    }

    return (
      <React.Fragment>
        <div>{tokenMetrics}</div>
      </React.Fragment>
    );
  }

  private handleGenerateToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ 
      loading: true,
      errorMessage: '',
      disableButton: true
    });

    console.log('deploying token contract');
    const { campaigns, user } = this.props;
    const c = campaigns.filter(
      campaign => campaign.user_id === user.id
    )[0];
    const token = localStorage.getItem('token');
    const newToken = await this.postToken(c.token_symbol, c.token_name, String(c.decimal_places), String(c.total_supply), c.token_address, c.id, token);
    this.setState({
      newToken
    })
    console.log('newly deployed token: ', this.state.newToken);

    this.setState({ loading: false });
  }

  private async postToken(symbol: string, name: string, decimal: string, totalSupply: string, genesisAddress: string, campaignId: number, token: string | null) {
    try {
      const newToken = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/token/deploy`,
        { symbol, name, decimal, total_supply: totalSupply, genesis_address: genesisAddress, campaign_id: campaignId, receive_address: genesisAddress },
        { headers: { Authorization: `Bearer ${token}` } });
      return newToken.data[0];
    } catch (err) {
      console.log(err);
    }
    return;
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    campaigns: state.campaign.campaigns,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    reloadCampaign: () => dispatch(loadCampaignsThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateToken);
