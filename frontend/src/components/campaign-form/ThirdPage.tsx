import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import * as validation from "./fieldLevelValidation";
import renderField from "./renderField";
// import validate from "./validate";

export interface IThirdPageProps {
  previousPage: any;
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
        validate={validation.required}
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        validate={validation.required}
      />
      <h2>and your company</h2>
      <Field
        name="companyName"
        type="text"
        component={renderField}
        label="Company Name"
        validate={validation.required}
      />
      <Field
        name="legalForm"
        type="text"
        component={renderField}
        label="Legel Form"
        validate={validation.required}
      />
      <Field
        name="regId"
        type="text"
        component={renderField}
        label="Entity Reg. ID"
        validate={validation.required}
      />
      <Field
        name="country"
        type="text"
        component={renderField}
        label="Country"
        validate={validation.required}
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
  form: "wizard"
})(ThirdPage);
