import * as React from "react";

const CardBox = ({
  heading,
  children,
  styleName = "col-lg-6 col-sm-12",
  cardStyle = "",
  childrenStyle = "",
  headerOutside
}: any) => {
  return (
    <div className={`${styleName}`}>
      {headerOutside && (
        <div className="jr-entry-header">
          <h3 className="entry-heading">{heading}</h3>
          {children.length > 1 && (
            <div className="entry-description">{children[0]}</div>
          )}
        </div>
      )}

      <div className={`jr-card ${cardStyle}`}>
        {!headerOutside &&
          (heading && (
            <div className="jr-card-header">
              <h3 className="card-heading">{heading}</h3>
              {children.length > 1 && (
                <div className="sub-heading">{children[0]}</div>
              )}
            </div>
          ))}
        <div className={`jr-card-body ${childrenStyle}`}>
          {children.length > 1 ? children[1] : children}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
