import IconButton from "@material-ui/core/IconButton";
import * as Joi from "joi";
import * as React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { IErrors } from "../modules";
import { IRootState } from "../reducers";
import * as actions from "../reducers/auth/actions";
import Input from "./common/input";
import { logo } from "./ImagesImport";

interface ILoginFormProps {
  history: any;
  location: any;
  match: any;
  error: any;
  isAuthenticated: boolean;
  authRedirectPath: string;
  onSignup: (email: string, password: string, username: string) => void;
  onSetAuthRedirectPath: () => void;
  loginFacebook: (accessToken: string) => void;
}

interface ILoginFormState {
  account: {
    email: string;
    password: string;
    username: string;
  };
  errors: IErrors;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  private schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    username: Joi.string()
      .required()
      .label("User Name")
  };

  constructor(props: any) {
    super(props);
    this.state = {
      account: {
        email: "",
        password: "",
        username: ""
      },
      errors: {}
    };
  }

  public render() {
    const { account, errors } = this.state;

    return (
      <React.Fragment>
        {/* Redirect to target route */}

        {this.props.isAuthenticated === true && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="app-login-main-content">
            <div className="app-logo-content d-flex align-items-center justify-content-center">
              <Link className="logo-lg" to="/" title="Jambo">
                <img src={logo} alt="app-logo" title="app-logo" />
              </Link>
            </div>

            <div className="app-login-content">
              <div className="app-login-header">
                <h1>Sign Up</h1>
              </div>

              <div className="mb-4">
                <h2>{/* <IntlMessages id="appModule.createAccount" /> */}</h2>
              </div>

              <div className="app-login-form">
                <form onSubmit={this.handleSubmit}>
                  <Input
                    name="email"
                    value={account.email}
                    label="Email"
                    onChange={this.handleChange}
                    error={
                      errors.email ||
                      (this.props.error ? this.props.error.response.data : null)
                    }
                  />
                  <Input
                    name="password"
                    value={account.password}
                    label="Password"
                    onChange={this.handleChange}
                    error={errors.password}
                    type="password"
                  />
                  <Input
                    name="username"
                    value={account.username}
                    label="User Name"
                    onChange={this.handleChange}
                    error={errors.username}
                  />
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <button
                      disabled={!!this.validate()}
                      className="btn btn-primary"
                    >
                      REGISTER
                    </button>
                    <Link to="/login">Already registered?</Link>
                  </div>
                  <div className="app-social-block my-1 my-sm-3">
                    {/* <IntlMessages id="signIn.connectWith" /> */}
                    <p>or connect with</p>
                    <ul className="social-link">
                      <li>
                        <IconButton className="icon">
                          <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,email"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            textButton=""
                            cssClass="icon zmdi zmdi-facebook bg-white"
                          />
                        </IconButton>
                      </li>
                    </ul>
                  </div>
                </form>
                {/* <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,email"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private componentClicked() {
    return null;
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();

    // call the server here
    // save the changes
    // redirect user to different pages
    const errors = this.validate();
    this.props.onSignup(
      this.state.account.email,
      this.state.account.password,
      this.state.account.username
    );
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
  };

  private handleChange = (event: any) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const account = { ...this.state.account };
    account[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ account, errors });
  };

  private validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  private validateProperty = (event: any) => {
    const { name, value } = event.currentTarget;

    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  private responseFacebook = (userInfo: any) => {
    if (userInfo.accessToken) {
      this.props.loginFacebook(userInfo.accessToken);
    }
    return null;
  };
}

// export default LoginForm;
const mapStateToProps = (state: IRootState) => {
  return {
    loading: state.auth.loading,
    // tslint:disable-next-line:object-literal-sort-keys
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginFacebook: (accessToken: string) =>
      dispatch(actions.loginFacebook(accessToken)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    onSignup: (email: string, password: string, username: string) =>
      dispatch(actions.auth(email, password, true, username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
