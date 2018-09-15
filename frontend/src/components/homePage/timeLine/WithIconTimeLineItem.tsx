import * as React from "react";

const WithIconTimeLineItem = ({
  styleName,
  color,
  timeLine,
  children
}: any) => {
  const { title, description } = timeLine;
  return (
    <div className={`timeline-item timeline-time-item ${styleName}`}>
      <div className={`timeline-badge bg-${color}`}>{children}</div>
      <div className="timeline-panel">
        <h4 className={`timeline-tile text-${color}`}>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default WithIconTimeLineItem;
