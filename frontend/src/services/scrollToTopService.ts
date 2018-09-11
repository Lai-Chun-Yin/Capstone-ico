import * as React from "react";
import { withRouter } from "react-router-dom";

interface IScrollToTop {
  location: any;
}

class ScrollToTop extends React.Component<IScrollToTop> {
  public componentDidUpdate(prevProps: IScrollToTop) {
    if (this.props.location !== prevProps.location) {
      document.querySelector(".app-main-content-wrapper")!.scrollTo(0, 0);
    }
  }

  public render() {
    return [];
  }
}

export default withRouter(ScrollToTop as any);
