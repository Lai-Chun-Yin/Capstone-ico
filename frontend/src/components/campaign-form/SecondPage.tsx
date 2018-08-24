import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
// import imageUploadField from "./imageUploadField";
import FileInput from "./imageUploadField";
import renderField from "./renderField";
import textAreaField from "./textAreaField";
import validate from "./validate";

// const renderError = ({ meta: { touched, error } }: any) =>
//   touched && error ? <span>{error}</span> : false;

export interface ISecondPageProps {
  previousPage: any;
}

const SecondPage: React.ComponentType<
  ISecondPageProps & InjectedFormProps<{}, ISecondPageProps>
> = (props: any) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={FileInput} name="imageFile" />
      <Field
        name="video"
        type="text"
        component={renderField}
        label="Link to the campaign video"
      />
      <Field
        name="longDescription"
        component={textAreaField}
        label="Campaign Description"
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

export default reduxForm<{}, ISecondPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard",
  validate
})(SecondPage);
