import * as React from "react";
import getDateTimeHK from "../../services/timeService";
import BasicCard from "../common/basicCard";

export interface ICampaignListProps {
  campaigns: any;
}

// export interface ICampaignListState {

// }

class CampaignList extends React.Component<ICampaignListProps> {
  public render() {
    return (
      <div className="row mb-md-4">
        {this.props.campaigns.map((e: any, i: number) => {
          const camPic = e.project_photo
            ? `https://s3.ap-northeast-2.amazonaws.com/capstone-ico/${
                e.project_photo
              }`
            : "http://via.placeholder.com/1280x720";
          return (
            <div key={i} className="col-lg-4 col-sm-6 col-12 mb-md-4">
              <BasicCard
                image={camPic}
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
    );
  }
}

export default CampaignList;
