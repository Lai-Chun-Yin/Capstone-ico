import * as React from "react";

// tslint:disable-next-line:no-var-requires
const NotificationContainer = require("react-notifications")
  .NotificationContainer;
// tslint:disable-next-line:no-var-requires
const NotificationManager = require("react-notifications").NotificationManager;
import "react-notifications/lib/notifications.css";
import ContainerHeader from "../common/containerHeader";

export interface IContactUsProps {
  match: any;
}

class ContactUs extends React.Component<IContactUsProps> {
  public render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="Contact Us" />
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-7 col-12">
            <div className="contact-form jr-card">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label form="firstName">Name</label>
                    <input
                      className="form-control form-control-lg"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="lastName">&nbsp;</label>
                    <input
                      className="form-control form-control-lg"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control form-control-lg"
                      id="email"
                      type="email"
                      placeholder="E-mail"
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      className="form-control form-control-lg"
                      id="phoneNumber"
                      type="tel"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="webSite">Website</label>
                    <input
                      className="form-control form-control-lg"
                      id="webSite"
                      type="text"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>How can we help you?</label>
                    <textarea
                      className="form-control form-control-lg"
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-0">
                    <button
                      className="btn btn-primary"
                      // tslint:disable-next-line:jsx-no-lambda
                      onClick={this.createNotification("success")}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-5 col-12">
            <div className="contact-block jr-card py-5 px-4">
              <ul className="contact-info vertical">
                <li>
                  <i className="zmdi zmdi-pin zmdi-hc-fw" />
                  <div className="contact-body">
                    <h4 className="text-uppercase">ADDRESS</h4>
                    <address className="mb-0">
                      44 New Design Street
                      <br />
                      Sheung Wan 005
                      <br />
                      Hong Kong
                    </address>
                  </div>
                </li>

                <li>
                  <i className="zmdi zmdi-phone zmdi-hc-fw" />
                  <div className="contact-body">
                    <h4 className="text-uppercase">Phone</h4>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="text-primary disable-link">
                        (852) 2331 5442
                      </a>
                    </div>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="text-primary disable-link">
                        (852) 2234 5245
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <i className="zmdi zmdi-email zmdi-hc-fw" />
                  <div className="contact-body">
                    <h4 className="text-uppercase">E-mail</h4>
                    <div>
                      <a className="text-primary" href="javascript:void(0)">
                        info@startoken.com
                      </a>
                    </div>
                    <div className="icons-wrapper">
                      <a
                        className="icon facebook-icon"
                        href="javascript:void(0)">
                        <i className="zmdi zmdi-facebook" />
                      </a>

                      <a
                        className="icon twitter-icon"
                        href="javascript:void(0)">
                        <i className="zmdi zmdi-twitter" />
                      </a>

                      <a className="icon google-icon" href="javascript:void(0)">
                        <i className="zmdi zmdi-google-plus" />
                      </a>

                      <a
                        className="icon linkedin-icon"
                        href="javascript:void(0)">
                        <i className="zmdi zmdi-linkedin" />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <NotificationContainer />
      </div>
    );
  }
  private createNotification = (type: string) => {
    return () => {
      switch (type) {
        case "success":
          NotificationManager.success("Message Sent");
          break;
      }
    };
  };
}

export default ContactUs;
