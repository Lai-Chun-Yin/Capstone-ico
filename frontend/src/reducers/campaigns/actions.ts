import axios from 'axios';
import { Dispatch } from 'redux';

export type CampaignActions = ILoadCampaignListAction;

export const LOAD_CAMPAIGN_LIST = 'LOAD_CAMPAIGN_LIST';
export type LOAD_CAMPAIGN_LIST = typeof LOAD_CAMPAIGN_LIST;

export interface ILoadCampaignListAction {
  type: LOAD_CAMPAIGN_LIST;
  campaigns: CapstoneICO.ICampaign[];
}

// normal action creator
export function LoadCampaignList(campaigns: CapstoneICO.ICampaign[]): ILoadCampaignListAction {
  return {
    campaigns,
    type: LOAD_CAMPAIGN_LIST,
  }
}

// thunk action creator
export function LoadCampaignListThunk() {
  return (dispatch: Dispatch<CampaignActions>) => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/campaign`).then(res => {
      dispatch(LoadCampaignList(res.data));
    });
  };
}