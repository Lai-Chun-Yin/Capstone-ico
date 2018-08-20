import { combineReducers } from "redux";
import { FormStateMap,reducer as formReducer } from "redux-form";
import { authReducer,IAuthState} from './auth/reducers';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  auth: authReducer,
  form: formReducer
});

export interface IRootState {
  auth:IAuthState,
  form:FormStateMap
}

export default rootReducer;
