import axios from 'axios';
import { Dispatch } from 'redux';

export const LOAD_TOKENS = 'LOAD TOKENS';
export type LOAD_TOKENS = typeof LOAD_TOKENS;

export interface ILoadTokensAction {
  type: LOAD_TOKENS;
  tokens: CapstoneICO.IToken[];
}

export type TokenActions = ILoadTokensAction;

export function loadTokens(tokens: CapstoneICO.IToken[]): TokenActions {
  return {
    tokens,
    type: LOAD_TOKENS
  }
}

export function loadTokensThunk() {
  return (dispatch: Dispatch<TokenActions>) => {
    axios.get<CapstoneICO.IToken[]>(`${process.env.REACT_APP_API_SERVER}/api/token`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(loadTokens(res.data));
    })
  }
}
