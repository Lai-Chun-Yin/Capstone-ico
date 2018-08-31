import * as React from "react";
import { connect } from 'react-redux';
import TopNav from "./components/topNav";
import { authCheckState } from './reducers/auth/actions';
// import NavBar from "./components/navbar";
import Routes from "./routes";
// tslint:disable-next-line:no-var-requires
const isIOS = require("react-device-detect").isIOS;
// tslint:disable-next-line:no-var-requires
const isMobile = require("react-device-detect").isMobile;
import Header from "./components/header";

interface IAppProps {
  onTryAutoSignup: () => void
}

// export interface IAppState {

// }

class App extends React.Component<IAppProps> {

  public componentDidMount() {
    this.props.onTryAutoSignup();
  }

  public render() {
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className="app-main-container">
        <div className="app-header app-header-horizontal">
          <Header />
          <TopNav />
        </div>
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
      onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
