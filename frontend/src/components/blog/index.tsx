import * as React from "react";
import ContainerHeader from "../common/containerHeader";
import { blogArticle1, blogArticle2, blogArticle3 } from "../ImagesImport";

const Blog = ({ match }: any) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader title="Blog" />
      <div className="row">
        <div className="col-md-10 m-auto animation slideInLeft">
          <div className="card shadow border-0 text-muted">
            <img className="card-img-top" src={blogArticle1} alt="post" />

            <div className="card-body">
              <h3>SunX — Crypto/Fiat exchange ecosystem...</h3>
              <div className="meta-wrapper">
                <span className="meta-date">
                  <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                  11 Sep, 2018
                </span>
              </div>
              <p className="card-text">
                Sunx is crypto/Fiat exchange ecosystem, with a mission to
                empower investors financially, given returns of up to 3–10%
                interest with our advance algorithm and app usage …
              </p>

              <div>
                <a
                  className="right-arrow"
                  href="https://medium.com/@startoken/sunx-crypto-fiat-exchange-ecosystem-fbd248bae87"
                  target="_blank"
                >
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <div className="card shadow border-0 text-muted">
            <img className="card-img-top" src={blogArticle2} alt="post" />

            <div className="card-body">
              <h3>K Systems — Blockchain for evolution…</h3>
              <div className="meta-wrapper">
                <span className="meta-date">
                  <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                  11 Sep, 2018
                </span>
              </div>
              <p className="card-text">
                The KSYS Token is the K Systems LTD Token: Our company is a
                registered UK firm (#11291459, Unique Taxpayer Reference
                765811430 A), building and deploying dApps for the Aerospace and
                Automotive Industries (AS/EN 9100 Quality Standards and
                CAD/CAM/CAE Parametric Blockchain Based 3D Suites like K-ATIA),
                manufacturing the K Systems Supercomputer Series and providing
                ICO and Security services for startups …
              </p>

              <div>
                <a
                  className="right-arrow"
                  target="_blank"
                  href="https://medium.com/@startoken/zenrank-what-is-the-ksys-token-5c7f509cded1"
                >
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <div className="card shadow border-0 text-muted">
            <img className="card-img-top" src={blogArticle3} alt="post" />

            <div className="card-body">
              <h3>Faxport — Sports Business Service and Funding Platform</h3>
              <div className="meta-wrapper">
                <span className="meta-date">
                  <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                  11 Sep, 2019
                </span>
              </div>
              <p className="card-text">
                Faxport is a blockchain-based sports business service platform.
                Faxport will utilise naturally decentralised and unalterable
                distributed ledger technology to increase security and mutual
                trust levels, whilst also reducing abuse and establish a trust
                system for the global sports industry. Thereby, we provide a
                platform for participants with a user experience based on trust
                and security …
              </p>

              <div>
                <a
                  className="right-arrow"
                  href="https://medium.com/@startoken/faxport-sports-business-service-and-funding-platform-9b6b0a25aafc"
                >
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center my-3 my-sm-5">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  tabIndex={-1}
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0)">
                  1
                </a>
              </li>
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  tabIndex={-1}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Blog;
