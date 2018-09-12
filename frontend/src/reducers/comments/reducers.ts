import { ADD_COMMENTS_FRONT, CommentActions, LOAD_COMMENTS } from "./actions";

export interface ICommentState {
  comments: CapstoneICO.IComment[];
}

const initialState = {
  comments: []
};

export const commentReducer = (
  state: ICommentState = initialState,
  action: CommentActions
): ICommentState => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        comments: action.comments
      };

    case ADD_COMMENTS_FRONT:
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      };
  }
  return state;
};
