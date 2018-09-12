import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
// Button, CardImg, CardText, Col, Row
import { IRootState } from "../../reducers";
import { loadCampaignsThunk } from "../../reducers/campaigns/actions";

interface IGenerateTokenProps {
  campaigns: CapstoneICO.ICampaign[];
  isAuthenticated: boolean;
  user: { [key: string]: any };
  reloadCampaign: () => void;
}

interface IGenerateTokenState {
  issuedCampaign: CapstoneICO.ICampaign | null;
  loading: boolean;
  newToken: CapstoneICO.IToken | null;
}

class GenerateToken extends React.Component<IGenerateTokenProps, IGenerateTokenState> {
  constructor(props: IGenerateTokenProps) {
    super(props);
    this.state = {
      issuedCampaign: null,
      loading: false,
      newToken: null
    }
  }

  public async componentDidMount() {
    await this.props.reloadCampaign();

    if (this.props.campaigns.length > 0) {
      console.log('\n\n\nChecking user\n\nthis.props.user ', this.props.user);
      this.setState({
        issuedCampaign: this.props.campaigns.filter(
          campaign => campaign.user_id === this.props.user.id
        )[0]
      })
    }
  }

  public render() {
    const { campaigns, user } = this.props;
    console.log('render user ', user);
    console.log('render campaigns', campaigns);

    const issuedCampaign = campaigns.filter(
      campaign => campaign.user_id === user.id
    )[0];


    console.log('render issuedCampaign', issuedCampaign);

    // const issuedCampaign = this.props.campaigns.filter(
    //   campaign => campaign.user_id === this.props.user.id
    // )[0];

    // console.log('\n\n\n\nthis.props Campaign', this.props.campaigns);
    // console.log('issued Campaign', this.state.issuedCampaign);

    let tokenMetrics;

    if (issuedCampaign) {
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
              <Button color="success" onClick={this.handleGenerateToken}>GENERATE TOKEN</Button>
            </Card>
          </Col>

          <Col sm="6">
            <Card body={true}>
              <CardTitle>New Token</CardTitle>
              <CardText>
              {this.state.newToken ?
              (<ul>{Object.keys(this.state.newToken).map((value, k) => (
                  <li className='list-newToken-item'>{k} {value} ---> {this.state.newToken ? this.state.newToken[value] : ''}</li>
                ))}</ul>) : null}
              </CardText>
            </Card>
          </Col>
        </Row>
      )
    } else {
      tokenMetrics = ''
    }

    return (
      <React.Fragment>
        <div>{tokenMetrics}</div>
      </React.Fragment>
    );
  }

  private handleGenerateToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('deploying token contract');
    const { campaigns, user } = this.props;
    const c = campaigns.filter(
      campaign => campaign.user_id === user.id
    )[0];
    const token = localStorage.getItem('token');
    const newToken = await this.postToken(c.token_symbol, c.token_name, c.decimal_places, c.total_supply, c.token_address, c.id, token);
    this.setState({
      newToken
    })
    console.log('newly deployed token: ', this.state.newToken);
  }

  private async postToken(symbol: string, name: string, decimal: number, totalSupply: number, genesisAddress: string, campaignId: number, token: string | null) {
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
