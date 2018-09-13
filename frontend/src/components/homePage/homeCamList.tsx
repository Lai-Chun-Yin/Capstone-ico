import * as React from "react";
import getDateTimeHK from "../../services/timeService";
import BasicCard from "../common/basicCard";
import ContainerHeader from "../common/containerHeader";

export interface ICampaignListProps {
  campaigns: any;
}

// export interface ICampaignListState {

// }

class CampaignList extends React.Component<ICampaignListProps> {
  public render() {
    return (
      <React.Fragment>
        <ContainerHeader title="Popular Campaign" />

        <div className="row mb-md-4">
          {this.props.campaigns.map((e: any, i: number) => {
            return (
              <div key={i} className="col-lg-4 col-sm-6 col-12">
                <BasicCard
                  image={e.project_photo}
                  title={e.title}
                  subTitle={`End at: ${getDateTimeHK(e.end_date_)}`}
                  description={e.short_description}
                  toId={e.id}
                  btnText="Read More"
                  btnStyle="jr-btn bg-red"
                />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CampaignList;
