import * as Joi from "joi";
import * as React from "react";
import { IErrors } from "../modules";
import Input from "./common/input";

// export interface RegisterFormProps {

// }

export interface IRegisterFormState {
  data: {
    password: string;
    username: string;
    name: string;
  };
  errors: IErrors;
}

class RegisterForm extends React.Component<any, IRegisterFormState> {
  private schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    username: Joi.string()
      .required()
      .email()
      .label("Username")
  };

  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        name: "",
        password: "",
        username: ""
      },
      errors: {}
    };
  }

  public render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <Input
            name="name"
            value={data.name}
            label="name"
            onChange={this.handleChange}
            error={errors.name}
          />
          <button disabled={!!this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();

    // call the server
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

    const data = { ...this.state.data };
    data[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ data, errors });
  };

  private validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

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

export default RegisterForm;
