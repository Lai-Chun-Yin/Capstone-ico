import axios from 'axios';
import { Dispatch } from 'redux';

export const LOAD_WATCHLISTS = 'LOAD WATCHLISTS';
export type LOAD_WATCHLISTS = typeof LOAD_WATCHLISTS;

export interface ILoadWatchlistsAction {
  type: LOAD_WATCHLISTS;
  watchlists: CapstoneICO.ICampaign[];
}

export type WatchlistActions = ILoadWatchlistsAction;

export function loadWatchlists(watchlists: CapstoneICO.ICampaign[]): WatchlistActions {
  return {
    watchlists,
    type: LOAD_WATCHLISTS
  }
}

export function loadWatchlistsThunk() {
  return (dispatch: Dispatch<WatchlistActions>) => {
    axios.get<CapstoneICO.ICampaign[]>(`${process.env.REACT_APP_API_SERVER}/api/campaign/watchlist`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(loadWatchlists(res.data));
    })
  }
}
