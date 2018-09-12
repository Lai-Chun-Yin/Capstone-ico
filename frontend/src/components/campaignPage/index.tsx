import List from "@material-ui/core/List";
import * as History from "history";
import * as React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { IRootState } from "../../reducers";
import { loadCampaignsThunk,searchCampaignsThunk } from "../../reducers/campaigns/actions";
import { getCampaignBalance } from "../../services/campaignService";
import ContainerHeader from "../common/containerHeader";
import CampaignList from "./campaignList";
// import productData from "./productData";

interface ICampaignProps {
  campaigns: CapstoneICO.ICampaign[];
  reloadCampaign: () => void;
  history: History.History;
  searchCampaign: (keyword:string) => void;
}
interface ICampaignState {
  campaignBalance: Array<{campaign_id:number,sum:string}>;
  searchKeyword: string;
}

class PureCampaigns extends React.Component<ICampaignProps,ICampaignState> {
  constructor(props: ICampaignProps) {
    super(props);
    this.state = {
      campaignBalance: [],
      searchKeyword: ""
    }
  }

  public componentDidMount = async () => {
    this.props.reloadCampaign();
    const result = await getCampaignBalance(null);
    this.setState({
      campaignBalance: result.data
    })
  }

  public render() {
    const { campaigns } = this.props;

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="All Active Campaigns" />

        <div className="card shadow border-0 bg-white p-2">
          <form className="m-0" role="search">
            <div className="search-bar">
              <div className="form-group">
                <input
                  type="search"
                  className="form-control form-control-lg border-0"
                  placeholder="Search..."
                  onChange={this.onKeywordChange}
                />
                <button className="search-icon" onClick={this.onSearch}>
                  <i className="zmdi zmdi-search zmdi-hc-lg" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <List>
            {campaigns.map((e: CapstoneICO.ICampaign) => (
              <CampaignList
                key={e.id}
                title={e.title}
                description={e.short_description}
                creator={e.full_name}
                startD={e.start_date}
                endD={e.end_date}
                soft={e.soft_cap}
                id={e.id}
                image={e.project_photo}
                balance={this.state.campaignBalance.filter(campaign => campaign.campaign_id === e.id)[0]}
              />
            ))}
          </List>
        </div>
      </div>
    );
  }

  private onKeywordChange = (e:any) => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  private onSearch = (e:any) =>{
    e.preventDefault();
    this.props.searchCampaign(this.state.searchKeyword);
  }
}

const Campaigns = connect(
  (state: IRootState) => ({
    campaigns: state.campaign.campaigns,
  }),
  (dispatch: any) => ({
    reloadCampaign: () => dispatch(loadCampaignsThunk()),
    searchCampaign: (keyword:string) => dispatch(searchCampaignsThunk(keyword))
  })
)(PureCampaigns);

export default Campaigns;
