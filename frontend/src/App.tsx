import * as React from "react";
import TopNav from "./components/navbar";
// import NavBar from "./components/navbar";
import Routes from "./routes";

// export interface IAppProps {

// }

// export interface IAppState {

// }

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <TopNav />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
