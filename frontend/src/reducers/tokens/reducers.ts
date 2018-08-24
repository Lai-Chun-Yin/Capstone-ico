import { LOAD_TOKENS, TokenActions } from './actions';

export interface ITokenState {
  tokens: CapstoneICO.IToken[];
}

const initialState = {
  tokens: []
};

export const tokenReducer = (state: ITokenState = initialState, action: TokenActions):ITokenState => {
  switch (action.type) {
    case LOAD_TOKENS:
      return {
        tokens: action.tokens
      }
  }
  return state;
}