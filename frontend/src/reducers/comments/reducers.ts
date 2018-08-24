import { CommentActions, LOAD_COMMENTS } from './actions';

export interface ICommentState {
  comments: CapstoneICO.IComment[];
}

const initialState = {
  comments: []
};

export const commentReducer = (state: ICommentState = initialState, action: CommentActions):ICommentState => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        comments: action.comments
      }
  }
  return state;
}