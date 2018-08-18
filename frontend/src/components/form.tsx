import * as React from "react";
import { Field, reduxForm } from "redux-form";

const ContactForm = (props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Campaign title</label>
        <Field
          className="form-control"
          id="firstName"
          name="firstName"
          component="input"
          type="text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">description</label>
        <Field
          className="form-control"
          id="lastName"
          name="lastName"
          component="input"
          type="text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">some fucking detail</label>
        <Field
          className="form-control"
          id="email"
          name="email"
          component="input"
          type="email"
        />
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
