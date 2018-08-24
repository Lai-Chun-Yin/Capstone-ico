import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";

const FirstPage: React.ComponentType<InjectedFormProps> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard",
  validate
})(FirstPage);
