// tslint:disable-next-line:ordered-imports
import * as Joi from "joi";
import * as React from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { IErrors } from "../modules";
import { IRootState } from "../reducers";
import * as Authactions from "../reducers/auth/actions";
import Input from "./common/input";

interface ILoginFormProps {
  history: any;
  location: any;
  match: any;
  error: any;
  onLogin: (email: string, password: string) => void;
  onSetAuthRedirectPath: () => void;
  loginFacebook: (accessToken: string) => void;
}

interface ILoginFormState {
  account: {
    email: string;
    password: string;
  };
  errors: IErrors;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  private schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  constructor(props: any) {
    super(props);
    this.state = {
      account: {
        email: "",
        password: ""
      },
      errors: {}
    };
  }

  public render() {
    const { account, errors } = this.state;

    return (
      <React.Fragment>
        {console.log(this.props.error)}
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="email"
              value={account.email}
              label="Email"
              onChange={this.handleChange}
              error={errors.email}
            />
            <Input
              name="password"
              value={account.password}
              label="Password"
              onChange={this.handleChange}
              error={errors.password}
            />
            <button disabled={!!this.validate()} className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
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
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.props.onLogin(this.state.account.email, this.state.account.password);

    console.log();
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
      dispatch(Authactions.loginFacebook(accessToken)),
    onLogin: (email: string, password: string) =>
      dispatch(Authactions.auth(email, password, false)),
    onSetAuthRedirectPath: () => dispatch(Authactions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
