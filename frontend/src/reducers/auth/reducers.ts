/* tslint:disable */
import {AuthActions,AUTH_START,AUTH_SUCCESS,AUTH_FAILURE,AUTH_LOGOUT,SET_AUTH_REDIRECT_PATH} from './actions';

export interface IAuthState {
    token: string|null;
    userId: string|null;
    error: Error|null;
    loading: boolean;
    authRedirectPath: string;
}

const initialState:IAuthState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export function authReducer(state:IAuthState = initialState,action:AuthActions){
    switch(action.type){
        case AUTH_START: return {
            ...state,
            error: null,
            loading: true
        }
        case AUTH_SUCCESS: return {
            ...state,
            token: action.token,
            userId: action.userId,
            error: null,
            loading: false
        }
        case AUTH_FAILURE: return {
            ...state,
            error: action.error,
            loading: false
        }
        case AUTH_LOGOUT: return {
            ...state,
            token: null,
            userId: null
        }
        case SET_AUTH_REDIRECT_PATH: return {
            ...state,
            authRedirectPath: action.path
        }
    }
    return state;
}