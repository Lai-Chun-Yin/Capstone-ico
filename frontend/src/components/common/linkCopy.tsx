import { Button } from "@material-ui/core";
import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";

interface ILinkCopyState {
  value: string;
  copied: boolean;
}

// interface ILinkCopyProps {
//   location: string;
// }

class LinkCopy extends React.Component<any, ILinkCopyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: window.location.href,
      copied: false
    };
  }

  public render() {
    return (
      <div className="search-bar right-side-icon bg-transparent">
        <div className="form-group">
          <input
            type="text"
            value={this.state.value}
            size={10}
            onChange={this.onChange}
            className="form-control-lg"
          />

          <CopyToClipboard text={this.state.value} onCopy={this.onCopy}>
            <Button
              variant="raised"
              color="primary"
              className="jr-btn mr-2 ml-2"
            >
              Copy link
            </Button>
          </CopyToClipboard>

          <div>
            {this.state.copied ? (
              <span className="text-red">Copied</span>
            ) : null}
          </div>
          <br />
        </div>
      </div>
    );
  }

  private onChange = ({ target: { value } }: any) => {
    this.setState({ value, copied: false });
  };

  private onCopy = () => {
    this.setState({ copied: true });
  };
}

export default LinkCopy;
