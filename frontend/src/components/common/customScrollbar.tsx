import * as React from "react";

// tslint:disable-next-line:no-var-requires
const Scrollbars = require("react-custom-scrollbars").Scrollbars;

export interface ICustomScrollbarsProps {
  [key: string]: any;
}

const CustomScrollbar: React.SFC<ICustomScrollbarsProps> = (props: any) => {
  return (
    <Scrollbars
      {...props}
      autoHide={true}
      // tslint:disable-next-line:no-shadowed-variable jsx-no-lambda
      renderTrackHorizontal={(props: any) => (
        <div
          {...props}
          style={{ display: "none" }}
          className="track-horizontal"
        />
      )}
    />
  );
};

export default CustomScrollbar;
