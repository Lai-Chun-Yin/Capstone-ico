import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as History from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Link, match } from "react-router-dom";
import { Progress } from "reactstrap";
import { IRootState } from "../../reducers";
import { loadCampaignsThunk } from "../../reducers/campaigns/actions";
import {
  getCampaign,
  getCampaignBalance
} from "../../services/campaignService";
import getDateTimeHK from "../../services/timeService";
import CardBox from "../common/cardBox";
import LinkButton from "../common/linkButton";
import LinkCopy from "../common/linkCopy";
import CenteredTab from "./centeredTab";

interface ICampaignDetailsProps {
  campaigns: CapstoneICO.ICampaign[];
  end_date: string;
  match: match<ICampaignIdPathParam>;
  reloadCampaign: () => void;
  history: History.History;
}
interface ICampaignDetailsState {
  campaign: CapstoneICO.ICampaign | null;
  balance: number;
  dialogOpen: boolean;
}
interface ICampaignIdPathParam {
  campaignId: number;
}

class CampaignDetails extends React.Component<
  ICampaignDetailsProps,
  ICampaignDetailsState
> {
  constructor(props: ICampaignDetailsProps) {
    super(props);
    const targetCampaign = props.campaigns.filter(
      campaign => campaign.id === +props.match.params.campaignId
    );
    this.state = {
      campaign: targetCampaign[0],
      balance: 0,
      dialogOpen: false
    };
  }

  public async componentDidMount() {
    if (!this.state.campaign) {
      const campaignId = this.props.match.params.campaignId;

      // trigger get campaign action if access campagin directly
      this.props.reloadCampaign();

      const result1 = await getCampaign(campaignId);
      const result2 = await getCampaignBalance(campaignId);
      this.setState({
        campaign: result1.data[0],
        balance: Number(result2.data[0].sum)
      });

      return;
    }

    const targetCampaign = this.props.campaigns.filter(
      campaign => campaign.id === +this.props.match.params.campaignId
    );
    if (targetCampaign.length === 0) {
      this.props.history.push("/not-found");
      return;
    }
  }

  public onSupportHandler(event: any) {
    // event.preventDefault();
  }

  public render() {
    const { campaign, dialogOpen } = this.state;
    const { end_date } = this.props;

    const endDateString = getDateTimeHK(end_date, "d");

    let campaignHeader: any;
    let campaignContent: any;
    if (campaign) {
      campaignHeader = (
        <React.Fragment>
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between h1 break-text border-bottom border-primary p-3">
              <div>
                {campaign.full_name}

                <a href={`mailto:${campaign.email}`}>
                  <i className="zmdi zmdi-email zmdi-hc-fw text-grey" />
                </a>
              </div>
              <Button
                className="bg-light-blue text-white ml-auto"
                variant="extendedFab"
                aria-label="follow"
              >
                Follow
              </Button>

              <Button
                className="jr-btn text-uppercase text-primary d-none d-sm-none d-md-block"
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => this.setState({ dialogOpen: true })}
              >
                <span>share</span>
                <i className="zmdi zmdi-share zmdi-hc-fw" />
              </Button>
            </div>
          </div>

          <div className="row  mb-4">
            <div className="xlh1 font-weight-bold break-text col-12">
              {campaign.title}
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 d-md-flex align-items-center justify-content-start">
              <div className="pr-3 m-respon">
                <span className="d-block h1 m-0">
                  {this.state.balance.toFixed(2)}
                </span>
                <span className="h4">Raised, Eth</span>
              </div>

              <div className="pr-3 m-respon">
                <span className="d-block h1 m-0">100</span>
                <span className="h4">Backers</span>
              </div>

              <div className="m-respon">
                <span className="d-block h1 m-0">{endDateString}</span>
                <span className="h4">End day</span>
              </div>

              <div className="ml-auto m-respon">
                <LinkButton
                  variant="raised"
                  className="bg-deep-purple text-white text-capitalize"
                  component={Link}
                  to={`/campaign/details/${campaign.id}/contribute`}
                >
                  Support Campaign
                </LinkButton>
              </div>

              <div className="share-respon d-xl-none d-lg-none d-md-none">
                <Button
                  variant="fab"
                  className="jr-fab-btn bg-white"
                  // tslint:disable-next-line:jsx-no-lambda
                  onClick={() => this.setState({ dialogOpen: true })}
                >
                  <i className="zmdi zmdi-share zmdi-hc-fw" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="row d-flex justify-content-between">
              <div className="col-sm-1 text-left">
                <span>{`${this.state.balance.toFixed(2)} ETH`}</span>
                <span className="d-block">Raised</span>
              </div>

              <div className="col-sm-3 text-right">
                <span>{`${campaign.soft_cap} ETH`}</span>
                <span className="d-block">Soft cap</span>
              </div>

              <div className="col-sm-8 text-right">
                <span>{`${campaign.hard_cap} ETH`}</span>
                <span className="d-block">Hard cap</span>
              </div>
            </div>

            <Progress
              color="bg-teal"
              value={String((this.state.balance * 100) / campaign.hard_cap)}
              className="bg-grey lighten-2"
            >
              {`${((this.state.balance * 100) / campaign.hard_cap).toFixed(
                1
              )}%`}
            </Progress>
          </div>
        </React.Fragment>
      );
      campaignContent = (
        <React.Fragment>
          <CenteredTab campaign={campaign} />
        </React.Fragment>
      );
    }

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <CardBox styleName="col-lg-12 p-0" cardStyle="p-0">
          <div className="container-fluid p-2 bg-light lighten-5">
            {campaignHeader}
          </div>
        </CardBox>

        <div className="row">
          <div className="col-12">{campaignContent}</div>
        </div>

        <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>Share Campaign</DialogTitle>
          <DialogContent>
            <div className="row">
              <Button
                variant="fab"
                className="jr-fab-btn bg-indigo lighten-1 text-white mr-2"
              >
                <i className="zmdi zmdi-facebook zmdi-hc-lg" />
              </Button>

              <Button
                variant="fab"
                className="jr-fab-btn bg-light-blue accent-2 text-white mr-2"
              >
                <i className="zmdi zmdi-twitter zmdi-hc-lg" />
              </Button>
            </div>
          </DialogContent>
          <DialogContent>
            <LinkCopy />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  private handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    campaigns: state.campaign.campaigns
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reloadCampaign: () => dispatch(loadCampaignsThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
