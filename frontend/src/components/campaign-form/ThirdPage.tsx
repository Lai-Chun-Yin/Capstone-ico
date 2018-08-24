import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";

export interface IThirdPageProps {
  // handleSubmit: () => void;
  // pristine: any;
  previousPage: any;
  // submitting: any;
}

const ThirdPage: React.ComponentType<
  IThirdPageProps & InjectedFormProps<{}, IThirdPageProps>
> = (props: any) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Now, a little bit about you</h2>
      <Field
        name="fullName"
        type="text"
        component={renderField}
        label="Full Name"
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      <h2>and your company</h2>
      <Field
        name="companyName"
        type="text"
        component={renderField}
        label="Company Name"
      />
      <Field
        name="legalForm"
        type="text"
        component={renderField}
        label="Legel Form"
      />
      <Field
        name="regId"
        type="text"
        component={renderField}
        label="Entity Reg. ID"
      />
      <Field
        name="country"
        type="text"
        component={renderField}
        label="Country"
      />
      
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm<{}, IThirdPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard",
  validate
})(ThirdPage);
