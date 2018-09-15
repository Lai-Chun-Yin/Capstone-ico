import * as React from "react";

export interface IContainerHeaderProps {
  title: any;
}

const ContainerHeader: React.SFC<IContainerHeaderProps> = (props: any) => {
  return (
    <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
      <h2 className="title mb-0">{props.title}</h2>
    </div>
  );
};

export default ContainerHeader;
