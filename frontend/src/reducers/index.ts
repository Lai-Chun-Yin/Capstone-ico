import { combineReducers } from "redux";
import { FormStateMap, reducer as formReducer } from "redux-form";
import { authReducer, IAuthState } from "./auth/reducers";
import { campaignReducer, ICampaignState } from "./campaigns/reducers";
import { commentReducer, ICommentState } from "./comments/reducers";
import { ISideNavState, sideNavReducer } from "./sideNav/reducer";
import { ITokenState, tokenReducer } from "./tokens/reducers";
import { ITransactionState, transactionReducer } from "./transactions/reducers";
import { IWatchlistState, watchlistReducer } from "./watchlists/reducers";

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  auth: authReducer,
  form: formReducer,
  campaign: campaignReducer,
  comment: commentReducer,
  token: tokenReducer,
  transaction: transactionReducer,
  watchlist: watchlistReducer,
  sideNav: sideNavReducer
});

export interface IRootState {
  auth: IAuthState;
  form: FormStateMap;
  campaign: ICampaignState;
  comment: ICommentState;
  token: ITokenState;
  transaction: ITransactionState;
  watchlist: IWatchlistState;
  sideNav: ISideNavState;
}

export default rootReducer;
