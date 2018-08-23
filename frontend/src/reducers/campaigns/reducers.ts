import { CampaignActions, LOAD_CAMPAIGN_LIST } from './actions';

const initialState = {
  campaignList: []
}

export interface ICampaignState {
  campaignList: CapstoneICO.ICampaign[];
}

export function campaignReducer(state: ICampaignState = initialState, action: CampaignActions) {
  switch (action.type) {
    case LOAD_CAMPAIGN_LIST:
      return {
        campaignList: action.campaigns
      }
  }
  return state;
}