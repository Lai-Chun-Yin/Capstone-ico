import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import * as History from "history";
import * as React from "react";
import { match } from "react-router-dom";
import { getCampaign } from "../../services/campaignService";
import getDateTimeHK from "../../services/timeService";
import CardBox from "../common/cardBox";
import LinkCopy from "../common/linkCopy";
import Youtube from "../Youtube";

interface ICampaignDetailsProps {
  campaigns: CapstoneICO.ICampaign[];
  match: match<ICampaignIdPathParam>;
  history: History.History;
}
interface ICampaignDetailsState {
  campaign: CapstoneICO.ICampaign | null;
  dialogOpen: boolean;
}
interface ICampaignIdPathParam {
  campaignId: number;
}

class PendingDetails extends React.Component<
  ICampaignDetailsProps,
  ICampaignDetailsState
  > {
  constructor(props: ICampaignDetailsProps) {
    super(props);
    this.state = {
      campaign: null,
      dialogOpen: false
    };
  }

  public async componentDidMount() {
    const campaignId = this.props.match.params.campaignId;
    // const token = localStorage.getItem("token");

    const result = await getCampaign(campaignId);

    this.setState({ campaign: result.data[0] });
  }

  public render() {
    const { campaign, dialogOpen } = this.state;

    let endDateString; 
    if(campaign){endDateString = getDateTimeHK(campaign.end_date, "d");}

    let projectPic: any;
    if (campaign) {
      projectPic = campaign.project_photo ? (
        <img
          src={
            "https://s3.ap-northeast-2.amazonaws.com/capstone-ico/" +
            campaign.project_photo
          }
          className="img-fluid img-thumbnail"
          alt="logo"
        />
      ) : null;
    } else {
      projectPic = null;
    }
    let videoPlayer: any;
    if (campaign) {
      videoPlayer = campaign.video_url ? (
        <Youtube videoId={campaign.video_url} />
      ) : null;
    } else {
      videoPlayer = null;
    }

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
            </div>
          </div>

          <div className="row  mb-4">
            <div className="xlh1 font-weight-bold break-text col-12">
              {campaign.title}
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 d-md-flex align-items-center justify-content-start">
              <div className="m-respon">
                <span className="d-block h1 m-0">{endDateString}</span>
                <span className="h4">End day</span>
              </div>

              <div className="ml-auto m-respon">
                <Button onClick={this.onApproveHandler}>
                  Approve Campaign
                </Button>
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
            <div className="row">
              <div className="col-sm-4 text-right">
                <span>{`${campaign.soft_cap} ETH`}</span>
                <span className="d-block">Soft cap</span>
              </div>

              <div className="col-sm-8 text-right">
                <span>{`${campaign.hard_cap} ETH`}</span>
                <span className="d-block">Hard cap</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
      campaignContent = (
        <React.Fragment>
          <section>
            {videoPlayer}
            {projectPic}

            <h3>{campaign.short_description}</h3>
            {/* <p>{campaign.long_description}</p> */}
            <div dangerouslySetInnerHTML={{ __html: campaign.long_description }} />
          </section>
        </React.Fragment>
      );
    }

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <CardBox styleName="col-lg-12 p-0" cardStyle="p-0">
          <div className="container-fluid p-2">{campaignHeader}</div>
        </CardBox>
        <div className="container">
          <div className="row">
            <div className="col-12">{campaignContent}</div>
          </div>
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
  private onApproveHandler = async(e:any) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_API_SERVER}/api/campaign/pending/approve/${this.props.match.params.campaignId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } });
      alert("Successfully approved");
      this.props.history.goBack();
    } catch(err){
      alert("Failed to approve.");
    }
  };
  private handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
}

export default PendingDetails;
