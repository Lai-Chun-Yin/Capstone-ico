import * as History from "history";
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { IRootState } from '../../reducers';
import { loadCampaignsThunk } from '../../reducers/campaigns/actions';

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
    const campaignCards = this.props.campaigns.map((campaign) => {
      return (
        <div className="col-sm-6 col-md-4" key={campaign.id}>
          <Link to={"/campaign/details/" + campaign.id} >
            <div className="card" >
              <img className="card-img-top" src={'https://s3.ap-northeast-2.amazonaws.com/capstone-ico/' + campaign.project_photo} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{campaign.title}</h5>
                <p className="card-text">{campaign.short_description}</p>
                <p className="card-text"><small className="text-muted">Hard Cap: {campaign.hard_cap}</small></p>
                <p className="card-text"><small className="text-muted">Start Date: {campaign.start_date}</small></p>
              </div>
            </div>
          </Link>
        </div>
      )
    });
    return (
      <React.Fragment>
        <h2>Active Campaigns</h2>
        <div className="container-fluid">
          <div className="row">
            {campaignCards}
          </div>
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
    reloadCampaign: () => dispatch(loadCampaignsThunk()),
  })
)(PureCampaigns);

export default Campaigns;