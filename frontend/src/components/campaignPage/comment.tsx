import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Send from "@material-ui/icons/Send";
import * as React from "react";
import { connect } from "react-redux";
import { addCommentsFront } from "../../reducers/comments/actions";
import { timeAgo } from "../../services/timeService";

export interface ICommentProps {
  comments: CapstoneICO.IComment[];
}

export interface ICommentState {
  value: string;
}
class Comment extends React.Component<ICommentProps, ICommentState> {
  public onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: e.currentTarget.value
    });
  }
  public render() {
    const { comments } = this.props;

    return (
      <div className="col-12">
        {comments.length === 0 ? (
          <h2 className="font-italic text-grey">There are no comments yet</h2>
        ) : (
          comments.map((e, i) => {
            return (
              <section key={i} className="mb-4 col-12">
                <div>
                  <span className="h3 font-weight-bold">{e.alias}</span>
                  <small className="m-2">{timeAgo(e.date)}</small>
                </div>

                <div className="mt-2 ml-2">
                  <h3>{e.content}</h3>
                </div>
              </section>
            );
          })
        )}

        <form className="col-8">
          <FormControl className="mb-3" fullWidth={true}>
            <InputLabel htmlFor="text"> Add Comment</InputLabel>
            <Input
              // tslint:disable-next-line:jsx-no-bind
              onChange={this.onValueChange.bind(this)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <Send type="submit" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any, comment: any) => {
  return { addCommentsFront: () => dispatch(addCommentsFront(comment)) };
};

export default connect(
  null,
  mapDispatchToProps
)(Comment);
