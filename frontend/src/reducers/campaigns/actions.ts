import axios from 'axios';
import { Dispatch } from 'redux';

export type CampaignActions = ILoadCampaignListAction;

export const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';
export type LOAD_CAMPAIGNS = typeof LOAD_CAMPAIGNS;

export interface ILoadCampaignListAction {
  type: LOAD_CAMPAIGNS;
  campaigns: CapstoneICO.ICampaign[];
}

// normal action creator
export function loadCampaigns(campaigns: CapstoneICO.ICampaign[]): ILoadCampaignListAction {
  return {
    campaigns,
    type: LOAD_CAMPAIGNS,
  }
}

// thunk action creator
export function loadCampaignsThunk() {
  return (dispatch: Dispatch<CampaignActions>) => {
    axios.get<CapstoneICO.ICampaign[]>(`${process.env.REACT_APP_API_SERVER}/api/campaign`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(loadCampaigns(res.data));
    });
  };
}