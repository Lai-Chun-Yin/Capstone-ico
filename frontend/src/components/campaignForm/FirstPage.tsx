import Button from "@material-ui/core/Button";
import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
// tslint:disable-next-line:no-var-requires
const Field = require("redux-form").Field;
import renderDatePicker from "./datePickerField";
import RenderTextField from "./renderTextField";

import * as validation from "./fieldLevelValidation";

// // import validate from "./validate";

const FirstPage: React.ComponentType<InjectedFormProps> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="row">
      <h1 className="entry-heading mb-4 col-12 text-center">
        1 of 4: basic information
      </h1>

      <Field
        name="campaignName"
        component={RenderTextField}
        label="Campaign Name"
        validate={validation.required}
        helper="Choose something simple, specific, and memorable. Don’t use words like ‘help’, ‘support’, or ‘fund’."
        multiline={false}
      />

      <Field
        name="shortDescription"
        component={RenderTextField}
        label="Short description"
        validate={[validation.required, validation.maxChar100]}
        helper="Your elevator pitch. Describe your project in a few well-phrased sentences, so people can easily understand what it’s all about."
        multiline={true}
      />

      <Field
        name="startDate"
        component={renderDatePicker}
        label="Start Date"
        validate={[
          validation.required,
          validation.campaignDates.validateStartDate
        ]}
      />
      <Field
        name="endDate"
        component={renderDatePicker}
        label="End Date"
        validate={[
          validation.required,
          validation.campaignDates.validateEndDate
        ]}
      />

      <div>
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

export default reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(FirstPage);
