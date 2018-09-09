import * as React from "react";
import { Link } from "react-router-dom";
import getDateTimeHK from "../../services/timeService";
import LinkButton from "../common/linkButton";

const pendingList = ({
  title,
  creator,
  description,
  endD,
  id,
  soft,
  startD,
  image
}: any) => {
  const startDstring = getDateTimeHK(startD, "d");
  const endDstring = getDateTimeHK(endD, "d");
  return (
    <div className="card product-item-vertical hoverable animation flipInX">
      <div className="row d-flex align-items-sm-center">
        <div className="col-xl-3 col-lg-4 col-md-3 col-12">
          <div className="card-header border-0 p-0">
            <div className="card-image">
              <div className="grid-thumb-equal">
                <a className="grid-thumb-cover" href="javascript:void(0)">
                  <img
                    className="img-fluid"
                    src={
                      "https://s3.ap-northeast-2.amazonaws.com/capstone-ico/" +
                      image
                    }
                    alt="..."
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-5 col-md-6 col-12">
          <div className="card-body">
            <div className="product-details">
              <h3 className="card-title fw-regular">
                {title}
                <small className="text-grey text-darken-2 m-3">{creator}</small>
              </h3>

              <div className="d-flex justify-content-between">
                <p className="">
                  {startDstring}{" "}
                  <p className="card-subtitle mt-1">Start day </p>
                </p>
                <p className="">
                  {endDstring}
                  <p className="card-subtitle mt-1">End day </p>
                </p>
              </div>

              <p>{description}</p>

              <div className="text-right">
                {`${soft} ETH`} <br />
                <small>Soft cap</small>
              </div>
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
                to={`/campaign/pending/details/${id}`}
              >
                Read more
              </LinkButton>
            </div>

            {/* <LinkButton
              className="text-capitalize text-light-blue"
              component={Link}
              to={`/campaign/details/${id}/contribute`}
            >
              Approve
            </LinkButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default pendingList;
