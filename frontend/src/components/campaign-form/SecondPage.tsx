import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";

const renderError = ({ meta: { touched, error } }: any) =>
  touched && error ? <span>{error}</span> : false;

export interface ISecondPageProps {
  // handleSubmit: () => void;
  previousPage: any;
}

const SecondPage: React.ComponentType<
  ISecondPageProps & InjectedFormProps<{}, ISecondPageProps>
> = (props: any) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />{" "}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />{" "}
            Female
          </label>
          <Field name="sex" component={renderError} />
        </div>
      </div>
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

export default reduxForm<{}, ISecondPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard",
  validate
})(SecondPage);
