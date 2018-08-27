import { LOAD_WATCHLISTS, WatchlistActions } from './actions';

export interface IWatchlistState {
  watchlists: CapstoneICO.ICampaign[];
}

const initialState = {
  watchlists: []
};

export const watchlistReducer = (state: IWatchlistState = initialState, action: WatchlistActions):IWatchlistState => {
  switch (action.type) {
    case LOAD_WATCHLISTS:
      return {
        watchlists: action.watchlists
      }
  }
  return state;
}