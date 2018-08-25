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
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h2>3 of 4: profile and legal entity</h2>
      <h3>Now, a little bit about you</h3>
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
        validate={[validation.required,validation.email]}
      />
      <h3>and your company</h3>
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
        <button type="submit" className="next">
          Next
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
