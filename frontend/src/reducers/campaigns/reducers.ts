import { CampaignActions, LOAD_CAMPAIGNS, LOAD_PENDING_CAMPAIGNS, UPLOAD_CAMPAIGN_FAILURE, UPLOAD_CAMPAIGN_START, UPLOAD_CAMPAIGN_SUCCESS } from './actions';

const initialState = {
  campaigns: [],
  pendingCampaigns:[],
  uploading: false,
  error: null
}

export interface ICampaignState {
  campaigns: CapstoneICO.ICampaign[];
  pendingCampaigns: CapstoneICO.ICampaign[];
  uploading: boolean;
  error: Error | null;
}

export function campaignReducer(state: ICampaignState = initialState, action: CampaignActions):ICampaignState {
  switch (action.type) {
    case LOAD_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns
      }
    case LOAD_PENDING_CAMPAIGNS:
      return {
        ...state,
        pendingCampaigns: action.campaigns
      }
    case UPLOAD_CAMPAIGN_START:
      return {
        ...state,
        uploading: true,
        error: null
      }
    case UPLOAD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        uploading: false,
        error: null
      }
    case UPLOAD_CAMPAIGN_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.err
      }
  }
  return state;
}