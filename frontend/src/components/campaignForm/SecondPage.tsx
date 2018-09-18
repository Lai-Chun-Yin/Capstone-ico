import Button from "@material-ui/core/Button";
import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import Editor from "./editor";
import * as validation from "./fieldLevelValidation";
import RenderTextField from "./renderTextField";
// tslint:disable-next-line:no-var-requires
const Field = require("redux-form").Field;

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
      <h1 className="entry-heading mb-4 col-12 text-center">2 of 4: story</h1>

      <div className="col-12 mb-4">
        <label className="h2">Campaign card image</label>
        <input
          className="d-block"
          onChange={props.onFileChange}
          type="file"
          accept="image/*"
        />
      </div>

      <Field
        name="video"
        type="text"
        component={RenderTextField}
        label="Link to the campaign video"
        helper="Upload your video to YouTube and paste the link here. It doesn't have to be fancy or professional. Just be yourself and tell everyone about your dream."
        validate={validation.ytlink}
        multiline={false}
      />

      <Field
        component={Editor}
        label="Campaign Description"
        name="longDescription"
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
