import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import datePickerField from "./datePickerField";
import * as validation from "./fieldLevelValidation";
import renderField from "./renderField";
import textAreaField from "./textAreaField";
// import validate from "./validate";

const FirstPage: React.ComponentType<InjectedFormProps> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="campaignName"
        type="text"
        component={renderField}
        label="Campaign Name"
        validate={validation.required}
      />
      <Field
        name="shortDescription"
        component={textAreaField}
        label="Last Name"
        validate={[validation.required,validation.maxChar100]}
      />
      <Field
        name="startDate"
        component={datePickerField}
        label="Start Date"
        validate={validation.required}
      />
      <Field
        name="endDate"
        component={datePickerField}
        label="End Date"
        validate={validation.required}
      />
      <Field
        name="softCap"
        type="number"
        component={renderField}
        label="Soft Cap"
        validate={validation.required}
      />
      <Field
        name="hardCap"
        type="number"
        component={renderField}
        label="Hard Cap"
        validate={validation.required}
      />
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(FirstPage);
