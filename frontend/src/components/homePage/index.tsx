import * as React from "react";
import { connect } from "react-redux";
import { loadCampaignsThunk } from "../../reducers/campaigns/actions";
import { IRootState } from "../../reducers/index";
import CardBox from "../common/cardBox";
import ContainerHeader from "../common/containerHeader";
import Youtube from "../Youtube";
import BasicCarousel from "./basicCarousel";
import ContactUs from "./contactUs";
import CampaignList from "./homeCamList";
import TimeLine from "./timeLine";

export interface IHomePageProps {
  campaigns: any;
  match: any;
  reloadCampaign: () => void;
}

// export interface IHomePageState {

// }

class HomePage extends React.Component<IHomePageProps> {
  public componentDidMount() {
    this.props.reloadCampaign();
  }

  public render() {
    const campaigns = this.calcuCampaigns(this.props.campaigns);

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="row mb-md-4">
          <CardBox styleName="col-lg-12" cardStyle="p-0">
            <BasicCarousel />
          </CardBox>
        </div>
        <ContainerHeader title="Popular Campaign" />
        <CampaignList campaigns={campaigns} />
        <ContainerHeader title="Get Started in Following Steps" />
        <TimeLine />
        <ContainerHeader title="Why & how to Install MetaMask" />
        <div className="col-lg-8 m-auto">
          <div className="jr-card p-0">
            <div className="jr-card-body">
              <Youtube videoId="6Gf_kRE4MJU" />
            </div>
          </div>
        </div>
        <ContactUs match={this.props.match} />
      </div>
    );
  }
  private calcuCampaigns(campaigns: any) {
    const resultArry = [];

    let length = campaigns.length;
    let targetNum;
    const c = 3;

    if (length > c) {
      targetNum = c;
    } else {
      targetNum = length;
    }

    for (let k = 0; k < targetNum; k++) {
      const j = Math.floor(Math.random() * length);
      resultArry.push(campaigns[j]);
      campaigns.splice(j, 1);
      length--;
    }

    return resultArry;
  }
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
)(HomePage);
