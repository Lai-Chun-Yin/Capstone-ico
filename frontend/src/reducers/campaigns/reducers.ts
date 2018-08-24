import { CampaignActions, LOAD_CAMPAIGNS } from './actions';

const initialState = {
  campaigns: []
}

export interface ICampaignState {
  campaigns: CapstoneICO.ICampaign[];
}

export function campaignReducer(state: ICampaignState = initialState, action: CampaignActions):ICampaignState {
  switch (action.type) {
    case LOAD_CAMPAIGNS:
      return {
        campaigns: action.campaigns
      }
  }
  return state;
}