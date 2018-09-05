import List from "@material-ui/core/List";
import * as History from "history";
import * as React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { IRootState } from "../../reducers";
import { loadCampaignsThunk } from "../../reducers/campaigns/actions";
import ContainerHeader from "../common/containerHeader";
import CampaignListItem from "./campaignItem";
// import productData from "./productData";

interface ICampaignProps {
  campaigns: CapstoneICO.ICampaign[];
  reloadCampaign: () => void;
  history: History.History;
}

class PureCampaigns extends React.Component<ICampaignProps> {
  public componentDidMount() {
    this.props.reloadCampaign();
  }

  public render() {
    const { campaigns } = this.props;

    return (
      <React.Fragment>
        <ContainerHeader title="All Active Campaigns" />

        <div className="card shadow border-0 bg-white p-2">
          <form className="m-0" role="search">
            <div className="search-bar">
              <div className="form-group">
                <input
                  type="search"
                  className="form-control form-control-lg border-0"
                  placeholder="Search..."
                />
                <button className="search-icon">
                  <i className="zmdi zmdi-search zmdi-hc-lg" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="animated slideInUpTiny animation-duration-3">
          <List>
            {campaigns.map((e: CapstoneICO.ICampaign) => (
              <CampaignListItem
                key={e.id}
                title={e.title}
                description={e.short_description}
                creator={e.full_name}
                startD={e.start_date}
                endD={e.end_date}
                soft={e.soft_cap}
                id={e.id}
              />
            ))}
          </List>
        </div>
      </React.Fragment>
    );
  }
}

const Campaigns = connect(
  (state: IRootState) => ({
    campaigns: state.campaign.campaigns,
    user: state.auth.user
  }),
  (dispatch: any) => ({
    reloadCampaign: () => dispatch(loadCampaignsThunk())
  })
)(PureCampaigns);

export default Campaigns;
