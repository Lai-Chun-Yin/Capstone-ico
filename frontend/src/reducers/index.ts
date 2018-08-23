import { combineReducers } from "redux";
import { FormStateMap,reducer as formReducer } from "redux-form";
import { authReducer,IAuthState} from './auth/reducers';
import { campaignReducer, ICampaignState } from './campaigns/reducers';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  auth: authReducer,
  form: formReducer,
  campaign: campaignReducer
});

export interface IRootState {
  auth:IAuthState,
  form:FormStateMap,
  campaign:ICampaignState
}

export default rootReducer;
