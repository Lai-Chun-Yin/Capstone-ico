import axios from 'axios';
import { Dispatch } from 'redux';

export const LOAD_TRANSACTIONS = 'LOAD TRANSACTIONS';
export type LOAD_TRANSACTIONS = typeof LOAD_TRANSACTIONS;

export interface ILoadTransactionsAction {
  type: LOAD_TRANSACTIONS;
  transactions: CapstoneICO.ITransaction[];
}

export type TransactionActions = ILoadTransactionsAction;

export function loadTransactions(transactions: CapstoneICO.ITransaction[]): TransactionActions {
  return {
    transactions,
    type: LOAD_TRANSACTIONS
  }
}

export function loadTransactionsThunk() {
  return (dispatch: Dispatch<TransactionActions>) => {
    axios.get<CapstoneICO.ITransaction[]>(`${process.env.REACT_APP_API_SERVER}/api/transaction`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(loadTransactions(res.data));
    })
  }
}
