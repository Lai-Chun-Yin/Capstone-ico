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
import { loadCommentsThunk } from "../../reducers/comments/actions";
import { getBackersCount, getCampaign, getCampaignBalance } from "../../services/campaignService";
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
  loadComments: () => void;
  comments: CapstoneICO.IComment[];
  history: History.History;
  user: any;
  isAuthenticated: boolean;
}
interface ICampaignDetailsState {
  campaign: CapstoneICO.ICampaign | null;
  backersCount: number;
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
    this.state = {
      campaign: null,
      backersCount: 0,
      balance: 0,
      dialogOpen: false
    };
  }

  public async componentDidMount() {
    if (!this.state.campaign) {
      // trigger get campaign action if access campagin directly
      this.props.reloadCampaign();
    }

    const campaignId = this.props.match.params.campaignId;
    const result1 = await getCampaign(campaignId);
    const result2 = await getCampaignBalance(campaignId);
    const result3 = await getBackersCount(campaignId);
    this.setState({
      backersCount: (result3.data.length>0) ? Number(result3.data[0].count) : 0,
      balance: (result2.data.length>0) ? Number(result2.data[0].sum) : 0,
      campaign: result1.data[0]
    });

    const targetCampaign = this.props.campaigns.filter(
      campaign => campaign.id === +campaignId
    );
    if (targetCampaign.length === 0) {
      this.props.history.push("/not-found");
      return;
    }

    this.props.loadComments();
  }

  public onSupportHandler(event: any) {
    // event.preventDefault();
  }

  public render() {
    const { campaign, dialogOpen } = this.state;
    const { end_date, comments } = this.props;

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
                <span className="d-block h1 m-0">{this.state.backersCount}</span>
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
                  to={`/campaign/${campaign.id}/contribute`}
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
        <CenteredTab
          campaign={campaign}
          comments={comments}
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
        />
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
                href={
                  campaign
                    ? `https://www.facebook.com/sharer/sharer.php?u=https://startoken.network/campaign/${
                        campaign.id
                      }/details&text=${campaign.short_description}`
                    : undefined
                }
                target="_blank"
              >
                <i className="zmdi zmdi-facebook zmdi-hc-lg" />
              </Button>
              <Button
                variant="fab"
                className="jr-fab-btn bg-light-blue accent-2 text-white mr-2"
                href={
                  campaign
                    ? `https://twitter.com/intent/tweet?url=https://startoken.network/campaign/${
                        campaign.id
                      }/details&text=${campaign.short_description}`
                    : undefined
                }
                target="_blank"
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
const mapStateToProps = (state: IRootState, props: any) => {
  return {
    campaigns: state.campaign.campaigns,
    comments: state.comment.comments.filter(
      e => e.campaign_id === Number(props.match.params.campaignId)
    ),
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    reloadCampaign: () => dispatch(loadCampaignsThunk()),
    loadComments: () => dispatch(loadCommentsThunk())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
