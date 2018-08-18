import * as Joi from "joi";
import * as React from "react";
import Input from "./common/input";

interface ILoginFormProps {
  history: any;
  location: any;
  match: any;
}

interface ILoginFormState {
  account: {
    password: string;
    username: string;
  };
  errors: IErrors;
}

interface IErrors {
  [key: string]: any;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  private schema = {
    password: Joi.string()
      .required()
      .label("Password"),
    username: Joi.string()
      .required()
      .label("Username")
  };

  constructor(props: any) {
    super(props);
    this.state = {
      account: {
        password: "",
        username: ""
      },
      errors: {}
    };
  }

  public render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
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
    );
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
}

export default LoginForm;
