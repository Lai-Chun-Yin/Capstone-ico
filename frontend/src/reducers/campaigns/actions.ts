import axios from 'axios';
import { Dispatch } from 'redux';
import {reset} from 'redux-form';

export type CampaignActions = ILoadCampaignListAction|IUploadCampaignSuccessAction|IUploadCampaignStartAction;

export const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';
export type LOAD_CAMPAIGNS = typeof LOAD_CAMPAIGNS;
export const UPLOAD_CAMPAIGN_SUCCESS = 'UPLOAD_CAMPAIGN_SUCCESS';
export type UPLOAD_CAMPAIGN_SUCCESS = typeof UPLOAD_CAMPAIGN_SUCCESS;
export const UPLOAD_CAMPAIGN_START = 'UPLOAD_CAMPAIGN_START';
export type UPLOAD_CAMPAIGN_START = typeof UPLOAD_CAMPAIGN_START;

export interface ILoadCampaignListAction {
  type: LOAD_CAMPAIGNS;
  campaigns: CapstoneICO.ICampaign[];
}
export interface IUploadCampaignSuccessAction {
  type: UPLOAD_CAMPAIGN_SUCCESS;
  // campaign: any;
}
export interface IUploadCampaignStartAction {
  type: UPLOAD_CAMPAIGN_START;
}


// normal action creator
export function loadCampaigns(campaigns: CapstoneICO.ICampaign[]): ILoadCampaignListAction {
  return {
    campaigns,
    type: LOAD_CAMPAIGNS,
  }
}
export function uploadCampaign(): IUploadCampaignSuccessAction {
  return {
    type: UPLOAD_CAMPAIGN_SUCCESS
  }
}
export function uploadCampaignStart(): IUploadCampaignStartAction {
  return {
    type: UPLOAD_CAMPAIGN_START
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

export function uploadCampaignThunk(campaign:any) {
  return (dispatch: Dispatch<CampaignActions>) => {
    dispatch(uploadCampaignStart());
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/campaign`,campaign,{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(uploadCampaign());
      dispatch(reset('wizard'));
    });
  }
}