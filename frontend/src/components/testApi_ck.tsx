import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import { LoadCampaignListThunk } from '../reducers/campaigns/actions';

interface ITestApiProps {
  campaigns: CapstoneICO.ICampaign[];
  reloadCampaign: () => void;
}

class PureTestApi extends React.Component<ITestApiProps> {
  public componentWillMount() {
    this.props.reloadCampaign();
    console.log("this.props.campaigns", this.props.campaigns);
  }
  
  public render() {
    return (
      <div>
        {this.props.campaigns.map(campaign => (
          <ul className="list-campaign" key={campaign.id}>
            <li className="list-campaign-item">{campaign.title}</li>
            <li className="list-campaign-item">{campaign.short_description}</li>
            <li className="list-campaign-item">{campaign.start_date}</li>
            <li className="list-campaign-item">{campaign.end_date}</li>
            <li className="list-campaign-item">{campaign.soft_cap}</li>
            <li className="list-campaign-item">{campaign.hard_cap}</li>
          </ul>
        ))}
      </div>
    );
  } 
}

export const TestApi = connect(
  (state: IRootState) => ({
    campaigns: state.campaign.campaignList
  }),
  (dispatch: any) => ({
    reloadCampaign: () => dispatch(LoadCampaignListThunk())
  })
)(PureTestApi);