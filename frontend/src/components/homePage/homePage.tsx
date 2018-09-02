import * as React from "react";
import CardBox from "../common/cardBox";
import BasicCarousel from "./basicCarousel";
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
        <div className="row mb-md-4">
          <CardBox styleName="col-lg-12">
            <BasicCarousel />
          </CardBox>
        </div>
        <ContactUs match={this.props.match} />
      </div>
    );
  }
}

export default HomePage;
