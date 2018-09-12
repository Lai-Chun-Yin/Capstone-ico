import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Send from "@material-ui/icons/Send";
import * as React from "react";
import { connect } from "react-redux";
import { addCommentsFront } from "../../reducers/comments/actions";
import { postCommentBackend } from "../../services/commentService";
import { currentTime, timeAgo } from "../../services/timeService";

export interface ICommentProps {
  comments: CapstoneICO.IComment[];
  user: any;
  isAuthenticated: boolean;
  campaignId: number;
  addCommentFrontend: (comment: any) => void;
}

export interface ICommentState {
  content: string;
  alias: string;
  date: string;
  campaign_id: number;
}
class Comment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
    super(props);
    this.state = {
      content: "",
      alias: this.props.user.alias,
      date: "",
      campaign_id: this.props.campaignId
    };
  }

  public componentDidMount() {
    this.setState({ content: "" });
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
                  <small className="m-2">
                    {timeAgo(e.date) ? timeAgo(e.date) : "Just Now"}
                  </small>
                </div>

                <div className="mt-2 ml-2">
                  <h3>{e.content}</h3>
                </div>
              </section>
            );
          })
        )}

        {this.props.isAuthenticated && (
          // tslint:disable-next-line:jsx-no-bind
          <form onSubmit={this.handleSubmit.bind(this)} className="col-8">
            <FormControl className="mb-3" fullWidth={true}>
              <InputLabel htmlFor="text"> Add Comment</InputLabel>
              <Input
                value={this.state.content}
                // tslint:disable-next-line:jsx-no-bind
                onChange={this.onValueChange.bind(this)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <Send />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        )}
      </div>
    );
  }
  private onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      content: e.currentTarget.value
    });
  }
  private handleSubmit = (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    this.setState(
      {
        date: currentTime()
      },
      () => {
        this.props.addCommentFrontend(this.state);
        postCommentBackend(
          this.props.user.id,
          this.state.content,
          this.state.date,
          this.props.campaignId,
          token
        );
        this.setState({ content: "" });
      }
    );
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCommentFrontend: (comment: any) => dispatch(addCommentsFront(comment))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Comment);
