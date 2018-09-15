import {
  AccountBox,
  CreateNewFolder,
  Done,
  Subscriptions
} from "@material-ui/icons";
import * as React from "react";
import timeLineData from "./timeLineData";
import WithIconTimeLineItem from "./WithIconTimeLineItem";

const TimeLine = () => {
  return (
    <div className="mt-5">
      <div className="timeline-section timeline-center clearfix">
        <WithIconTimeLineItem timeLine={timeLineData[0]} color="pink">
          <AccountBox />
        </WithIconTimeLineItem>
        <WithIconTimeLineItem
          styleName="timeline-inverted"
          timeLine={timeLineData[1]}
          color="purple"
        >
          <CreateNewFolder />
        </WithIconTimeLineItem>
        <WithIconTimeLineItem timeLine={timeLineData[2]} color="red">
          <Subscriptions />
        </WithIconTimeLineItem>
        <WithIconTimeLineItem
          styleName="timeline-inverted"
          timeLine={timeLineData[3]}
          color="green"
        >
          <Done />
        </WithIconTimeLineItem>
      </div>
    </div>
  );
};

export default TimeLine;
