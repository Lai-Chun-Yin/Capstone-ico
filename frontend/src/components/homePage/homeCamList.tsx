import * as React from "react";
import BasicCard from "../common/basicCard";
import ContainerHeader from "../common/containerHeader";

// export interface ICampaignListProps {

// }

// export interface ICampaignListState {

// }

class CampaignList extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <ContainerHeader title="Popular Campaign" />

        <div className="row mb-md-4">
          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <BasicCard
              image="http://via.placeholder.com/500x330"
              title="Card Title"
              subTitle="Mixed Content With Fixed Width"
              description="Small plates, salads & sandwiches in an intimate setting with 12 indoor seats plus patio seating"
              btnText="Read More"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CampaignList;
