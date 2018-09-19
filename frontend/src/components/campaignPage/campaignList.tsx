import * as React from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import getDateTimeHK from "../../services/timeService";
import LinkButton from "../common/linkButton";

const CampaignList = ({
  title,
  creator,
  description,
  endD,
  id,
  soft,
  startD,
  image,
  balance
}: any) => {
  const startDstring = getDateTimeHK(startD, "d");
  const endDstring = getDateTimeHK(endD, "d");
  const camPic = image
    ? `https://s3.ap-northeast-2.amazonaws.com/capstone-ico/${image}`
    : "http://via.placeholder.com/720x720";
  return (
    <div className="card product-item-vertical hoverable animation flipInX">
      <div className="row d-flex align-items-sm-center">
        <div className="col-xl-3 col-lg-4 col-md-3 col-12">
          <div className="card-header border-0 p-0">
            <div className="card-image">
              <div className="grid-thumb-equal">
                <Link
                  className="grid-thumb-cover"
                  to={`/campaign/${id}/details`}>
                  <img
                    className="img-fluid campaign-list-img"
                    src={camPic}
                    alt="..."
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-5 col-md-6 col-12">
          <div className="card-body">
            <div className="product-details">
              <h1 className="card-title fw-regular xlh3">
                {title}
                <small className="text-grey text-darken-2 m-3">{creator}</small>
              </h1>

              <div className="d-flex justify-content-between">
                <h3>
                  {startDstring}{" "}
                  <p className="card-subtitle mt-1">Start day </p>
                </h3>
                <h3 className="">
                  {endDstring}
                  <p className="card-subtitle mt-1">End day </p>
                </h3>
              </div>

              <h2 className="font-italic">{description}</h2>

              <div className="d-flex justify-content-between">
                <div className="text-left">
                  {`${balance ? Number(balance.sum).toFixed(2) : 0} ETH`} <br />
                  <small>Raised</small>
                </div>

                <div className="text-right">
                  {`${soft} ETH`} <br />
                  <small>Soft cap</small>
                </div>
              </div>

              <Progress
                color="bg-teal"
                value={String((balance ? balance.sum * 100 : 0) / soft)}
                className="bg-grey lighten-2">
                {`${((balance ? balance.sum * 100 : 0) / soft).toFixed(1)}%`}
              </Progress>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-md-3 col-12">
          <div className="card-footer border-0 text-center bg-white">
            <div className="cart-btn mb-2">
              <LinkButton
                variant="raised"
                className="bg-secondary text-white text-capitalize"
                component={Link}
                to={`/campaign/${id}/details`}>
                Read more
              </LinkButton>
            </div>

            <LinkButton
              className="text-capitalize text-light-blue"
              component={Link}
              to={`/campaign/${id}/contribute`}>
              back campaign
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
