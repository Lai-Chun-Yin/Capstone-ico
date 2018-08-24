import axios from 'axios';
import { Dispatch } from 'redux';

export const LOAD_COMMENTS = 'LOAD COMMENTS';
export type LOAD_COMMENTS = typeof LOAD_COMMENTS;

export interface ILoadCommentsAction {
  type: LOAD_COMMENTS;
  comments: CapstoneICO.IComment[];
}

export type CommentActions = ILoadCommentsAction;

export function loadComments(comments: CapstoneICO.IComment[]): CommentActions {
  return {
    comments,
    type: LOAD_COMMENTS
  }
}

export function loadCommentsThunk() {
  return (dispatch: Dispatch<CommentActions>) => {
    axios.get<CapstoneICO.IComment[]>(`${process.env.REACT_APP_API_SERVER}/api/comment`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(loadComments(res.data));
    })
  }
}