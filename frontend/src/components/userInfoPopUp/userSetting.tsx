import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// import axios from "axios";
import * as Joi from "joi";
import * as React from "react";
import { connect } from "react-redux";
import { IErrors } from "../../modules";
import { userSettingsThunk } from "../../reducers/auth/actions";
import ContainerHeader from "../common/containerHeader";
import Input from "../common/input";

export interface IUserSettingProps {
  error: any;
  changeSettings: (obj: any) => void;
}

export interface IUserSettingState {
  account: {
    oldPassword: string;
    newPassword: string;
  };
  newUsername: string;
  errors: IErrors;
  dialog: any;
}

const styles = {
  textField: {
    width: 200
  }
};

class UserSetting extends React.Component<any, IUserSettingState> {
  private schema = {
    newPassword: Joi.string()
      .min(5)
      .label("New Password"),
    oldPassword: Joi.string()
      .required()
      .label("Current Password")
  };
  constructor(props: any) {
    super(props);
    this.state = {
      account: {
        oldPassword: "",
        newPassword: ""
      },
      newUsername: "",
      errors: {},
      dialog: {
        open: false,
        message: ""
      }
    };
  }

  public render() {
    const { account, errors } = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="Account setting" />

        <div className="row">
          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <form onSubmit={this.onSubmit}>
                  <Input
                    name="oldPassword"
                    label="Current Password"
                    type="password"
                    value={account.oldPassword}
                    onChange={this.handleChange}
                    error={errors.oldPassword}
                  />
                  <br />
                  <Input
                    name="newPassword"
                    label="New Password"
                    type="password"
                    value={account.newPassword}
                    onChange={this.handleChange}
                    error={errors.newPassword}
                  />
                  <br />
                  <TextField
                    label="New Username"
                    style={styles.textField}
                    margin="normal"
                    value={this.state.newUsername}
                    onChange={this.newUsernameChange}
                  />
                  <br />

                  <Button
                    className="jr-btn bg-primary text-white m-2"
                    type="submit"
                    value="Submit"
                    disabled={!!this.validate()}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // private onFileChange = (event: any) => {
  //   this.setState({ file: event.target.files[0] });
  // }
  private onSubmit = async (event: any) => {
    event.preventDefault();
    const request: any = {
      changes: {}
    };
    request.pw = this.state.account.oldPassword;
    // const token = localStorage.getItem("token");

    // Check if changing user name
    if (this.state.newUsername.trim() !== "") {
      request.changes.alias = this.state.newUsername;
    }
    // Check if changing password
    if (this.state.account.newPassword !== "") {
      request.changes.pw = this.state.account.newPassword;
    }

    this.props.changeSettings(request);
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
  private newUsernameChange = (event: any) => {
    this.setState({
      newUsername: event.target.value
    });
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
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSettings: (request: any) => dispatch(userSettingsThunk(request))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserSetting);
