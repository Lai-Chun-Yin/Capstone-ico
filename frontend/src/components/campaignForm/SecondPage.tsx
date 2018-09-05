import Button from "@material-ui/core/Button";
import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
// import textAreaField from "./textAreaField";
// import FileInput from "./imageUploadField";
import RenderTextField from "../common/textField";
import * as validation from "./fieldLevelValidation";

// import validate from "./validate";

// const renderError = ({ meta: { touched, error } }: any) =>
//   touched && error ? <span>{error}</span> : false;

export interface ISecondPageProps {
  previousPage: any;
  onFileChange: (event: any) => void;
}

const SecondPage: React.ComponentType<
  ISecondPageProps & InjectedFormProps<{}, ISecondPageProps>
> = (props: any) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit} className="row">
      <h1 className="entry-heading mb-4 col-12">2 of 4: story</h1>

      <input onChange={props.onFileChange} type="file" accept="image/*" />
      <Field
        name="video"
        type="text"
        component={RenderTextField}
        label="Link to the campaign video"
        helper="Upload your video to YouTube and paste the link here. It doesn't have to be fancy or professional. Just be yourself and tell everyone about your dream."
        validate={validation.ytlink}
      />
      <Field
        name="longDescription"
        component={RenderTextField}
        label="Campaign Description"
        helper="f you can’t make a video, just write your story here instead. Tell what your goal is, why you want to reach it, and what will happen when you do."
        validate={validation.required}
      />
      <div>
        <Button
          className="ml-2 jr-btn"
          variant="raised"
          color="primary"
          onClick={previousPage}
        >
          <span>Previous</span>
          <i className="zmdi zmdi-arrow-left zmdi-hc-fw" />
        </Button>

        <Button
          type="submit"
          className="ml-2 jr-btn"
          variant="raised"
          color="primary"
        >
          <i className="zmdi zmdi-arrow-right zmdi-hc-fw" />
          <span>Next</span>
        </Button>
      </div>
    </form>
  );
};

export default reduxForm<{}, ISecondPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(SecondPage);
