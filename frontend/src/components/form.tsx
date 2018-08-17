import * as React from "react";
import { Field, reduxForm } from "redux-form";

const ContactForm = (props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <br />
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <br />
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const newContactForm = reduxForm({
  // a unique name for the form
  form: "contact"
})(ContactForm);

export default newContactForm;
