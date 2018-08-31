import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import { loadCampaignsThunk } from '../reducers/campaigns/actions';

interface ICampaignProps {
  campaigns: CapstoneICO.ICampaign[];
  reloadCampaign: () => void;
}

class PureCampaigns extends React.Component<ICampaignProps> {
  public componentDidMount() {
    this.props.reloadCampaign();
  }

  public render() {
    return (
      <div>
        {this.props.campaigns.map(campaign => (
          <div className="card">
            <img className="card-img-top" src={'https://s3.ap-northeast-2.amazonaws.com/capstone-ico/' + campaign.project_photo} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{campaign.title}</h5>
              <p className="card-text">{campaign.short_description}</p>
              <p className="card-text"><small className="text-muted">Hard Cap: {campaign.hard_cap}</small></p>
              <p className="card-text"><small className="text-muted">Start Date: {campaign.start_date}</small></p>
            </div>
          </div>
        ))}
      </div>
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