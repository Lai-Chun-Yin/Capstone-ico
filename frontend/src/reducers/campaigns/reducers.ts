import { CampaignActions, LOAD_CAMPAIGNS, UPLOAD_CAMPAIGN_FAILURE, UPLOAD_CAMPAIGN_START, UPLOAD_CAMPAIGN_SUCCESS } from './actions';

const initialState = {
  campaigns: [],
  uploading: false
}

export interface ICampaignState {
  campaigns: CapstoneICO.ICampaign[];
  uploading: boolean;
}

export function campaignReducer(state: ICampaignState = initialState, action: CampaignActions):ICampaignState {
  switch (action.type) {
    case LOAD_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns
      }
    case UPLOAD_CAMPAIGN_START:
      return {
        ...state,
        uploading: true
      }
    case UPLOAD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        uploading: false
      }
    case UPLOAD_CAMPAIGN_FAILURE:
      return {
        ...state,
        uploading: false
      }
  }
  return state;
}