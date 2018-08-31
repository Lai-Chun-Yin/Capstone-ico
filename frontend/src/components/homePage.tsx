import * as React from "react";
import ContactUs from "./contractUs";

export interface IHomePageProps {
  match: any;
}

// export interface IHomePageState {

// }

class HomePage extends React.Component<IHomePageProps> {
  public render() {
    return (
      <div>
        <h1>Home Page</h1>
        <br />
        <ContactUs match={this.props.match} />
      </div>
    );
  }
}

export default HomePage;
