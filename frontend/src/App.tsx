import * as React from "react";
import TopNav from "./components/topNav/topNav";
import Routes from "./routes";
// tslint:disable-next-line:no-var-requires
const isIOS = require("react-device-detect").isIOS;
// tslint:disable-next-line:no-var-requires
const isMobile = require("react-device-detect").isMobile;
import Header from "./components/header";
import SideNav from "./components/sideNav/sideNav";

class App extends React.Component {
  public render() {
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
    return (
      <div className="app-main-container">
        <div className="app-header app-header-horizontal">
          <SideNav />
          <Header />
          <TopNav />
        </div>
        <Routes />
      </div>
    );
  }
}

export default App;
