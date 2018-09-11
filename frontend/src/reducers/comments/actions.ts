import axios from "axios";
import { Dispatch } from "redux";

export const LOAD_COMMENTS = "LOAD COMMENTS";
export type LOAD_COMMENTS = typeof LOAD_COMMENTS;

export const ADD_COMMENTS_FRONT = "ADD COMMENTS FRONT";
export type ADD_COMMENTS_FRONT = typeof ADD_COMMENTS_FRONT;

export interface ILoadCommentsAction {
  type: LOAD_COMMENTS;
  comments: CapstoneICO.IComment[];
}

export interface IAddCommentsFrontCAction {
  type: ADD_COMMENTS_FRONT;
  comment: CapstoneICO.IComment;
}

export type CommentActions = ILoadCommentsAction | IAddCommentsFrontCAction;

export function addCommentsFront(
  comment: CapstoneICO.IComment
): CommentActions {
  return {
    comment,
    type: ADD_COMMENTS_FRONT
  };
}

export function loadComments(comments: CapstoneICO.IComment[]): CommentActions {
  return {
    comments,
    type: LOAD_COMMENTS
  };
}

export function loadCommentsThunk() {
  return (dispatch: Dispatch<CommentActions>) => {
    axios
      .get<CapstoneICO.IComment[]>(
        `${process.env.REACT_APP_API_SERVER}/api/comment`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        dispatch(loadComments(res.data));
      });
  };
}
