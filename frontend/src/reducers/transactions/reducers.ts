import { LOAD_TRANSACTIONS, TransactionActions } from './actions';

export interface ITransactionState {
  transactions: CapstoneICO.ITransaction[];
}

const initialState = {
  transactions: []
};

export const transactionReducer = (state: ITransactionState = initialState, action: TransactionActions):ITransactionState => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {
        transactions: action.transactions
      }
  }
  return state;
}