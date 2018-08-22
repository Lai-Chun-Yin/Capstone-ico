/* tslint:disable */
import axios from "axios";
import { Dispatch, Action } from "redux";

export type AuthActions =
  | AuthStartAction
  | AuthFailAction
  | AuthLogoutAction
  | AuthSuccessAction
  | SetAuthRedirectPathAction;

export const AUTH_START = "AUTH_START";
type AUTH_START = typeof AUTH_START;

export const AUTH_SUCCESS = "AUTH_SUCCESS";
type AUTH_SUCCESS = typeof AUTH_SUCCESS;

export const AUTH_FAILURE = "AUTH_FAILURE";
type AUTH_FAILURE = typeof AUTH_FAILURE;

export const AUTH_LOGOUT = "AUTH_LOGOUT";
type AUTH_LOGOUT = typeof AUTH_LOGOUT;

export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";
type SET_AUTH_REDIRECT_PATH = typeof SET_AUTH_REDIRECT_PATH;

export interface AuthStartAction extends Action {
  type: AUTH_START;
}

const authStart = (): AuthStartAction => {
  return {
    type: AUTH_START
  };
};

export interface AuthSuccessAction extends Action {
  type: AUTH_SUCCESS;
  token: string | null;
}

const authSuccess = (token: string | null): AuthSuccessAction => {
  return {
    type: AUTH_SUCCESS,
    token: token
  };
};

export interface AuthFailAction extends Action {
  type: AUTH_FAILURE;
  error: Error;
}

const authFail = (error: Error): AuthFailAction => {
  return {
    type: AUTH_FAILURE,
    error: error
  };
};

export interface AuthLogoutAction extends Action {
  type: AUTH_LOGOUT;
}

export const logout = (): AuthLogoutAction => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT
  };
};

export interface SetAuthRedirectPathAction extends Action {
  type: SET_AUTH_REDIRECT_PATH;
  path: string;
}

export const setAuthRedirectPath = (path: string) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const auth = (
  email: string,
  password: string,
  isSignup: boolean,
  username = ""
) => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      username
    };
    let url = `${process.env.REACT_APP_API_SERVER}/api/auth/login`;
    if (isSignup) {
      url = `${process.env.REACT_APP_API_SERVER}/api/auth/signup`;
    }
    axios
      .post(url, authData)
      .then((response: any) => {
        if (!response.data.token) {
          throw new Error("Incorrect entry");
        }
        // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem('expirationDate', expirationDate.toString());
        dispatch(authSuccess(response.data.token));
      })
      .catch((err: any) => {
        dispatch(authFail(err));
      });
  };
};

export const loginFacebook = (accessToken: string) => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/auth/facebook`, {
        access_token: accessToken
      })
      .then((response: any) => {
        if (!response.data) {
          throw new Error("Unknown error");
        } else if (!response.data.token) {
          throw new Error(response.data.message || "Unknown error");
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch(authSuccess(response.data.token));
        }
      })
      .catch((err: any) => {
        dispatch(authFail(err));
      });
  };
};

export const loginGoogle = (id_token: string) => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/auth/google`, { id_token })
      .then((response: any) => {
        if (!response.data) {
          throw new Error("Unknown error");
        }
      });
  };
};

export const authCheckState = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};
