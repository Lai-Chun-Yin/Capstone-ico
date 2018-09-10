import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Send from "@material-ui/icons/Send";
import * as React from "react";

// export interface ICommentProps {

// }

// export interface ICommentState {

// }

class Comment extends React.Component {
  public render() {
    return (
      <div className="col-12">
        <section className="mb-4 col-12">
          <div>
            <span className="h2">max</span>
            <small className="m-2">1 day ago</small>
          </div>

          <div className="mt-2">
            <h3>This is a good campaign</h3>
          </div>
        </section>

        <section className="mb-4 col-12">
          <div>
            <span className="h2">max</span>
            <small className="m-2">1 day ago</small>
          </div>

          <div className="mt-2">
            <h3>This is a good campaign</h3>
          </div>
        </section>

        <section className="mb-4 col-12">
          <div>
            <span className="h2">max</span>
            <small className="m-2">1 day ago</small>
          </div>

          <div className="mt-2">
            <h3>This is a good campaign</h3>
          </div>
        </section>

        <section className="col-8">
          <FormControl className="mb-3" fullWidth={true}>
            <InputLabel htmlFor="text"> Add Comment</InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <Send />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </section>
      </div>
    );
  }
}

export default Comment;
