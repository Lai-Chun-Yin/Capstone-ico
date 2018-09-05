import * as React from "react";
import CardBox from "../common/cardBox";
import BasicCarousel from "./basicCarousel";
import ContactUs from "./contractUs";
import CampaignList from "./homeCamList";

export interface IHomePageProps {
  match: any;
}

// export interface IHomePageState {

// }

class HomePage extends React.Component<IHomePageProps> {
  public render() {
    return (
      <React.Fragment>
        <div className="row mb-md-4">
          <CardBox styleName="col-lg-12" cardStyle="p-0">
            <BasicCarousel />
          </CardBox>
        </div>
        <CampaignList />
        <ContactUs match={this.props.match} />
      </React.Fragment>
    );
  }
}

export default HomePage;
