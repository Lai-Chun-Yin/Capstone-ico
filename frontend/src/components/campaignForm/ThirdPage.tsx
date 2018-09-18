// import validate from "./validate";

import { Button } from "@material-ui/core";
import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import * as validation from "./fieldLevelValidation";
import RenderTextField from "./renderTextField";

export interface IThirdPageProps {
  previousPage: any;
}

const ThirdPage: React.ComponentType<
  IThirdPageProps & InjectedFormProps<{}, IThirdPageProps>
> = (props: any) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit} className="row">
      <h1 className="entry-heading mb-3 col-12 text-center">
        3 of 4: profile and legal entity
      </h1>
      <h2 className="entry-heading mt-5 mb-3 col-12 text-center">
        Now, a little bit about you
      </h2>
      <Field
        name="fullName"
        type="text"
        component={RenderTextField}
        label="Full Name"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="email"
        type="email"
        component={RenderTextField}
        label="Email"
        validate={[validation.required, validation.email]}
        multiline={false}
      />

      <h2 className="entry-heading mt-5 mb-3 col-12 text-center">
        And your company
      </h2>
      <Field
        name="companyName"
        type="text"
        component={RenderTextField}
        label="Company Name"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="legalForm"
        type="text"
        component={RenderTextField}
        label="Legel Form"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="regId"
        type="text"
        component={RenderTextField}
        label="Entity Reg. ID"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="country"
        type="text"
        component={RenderTextField}
        label="Country"
        helper="The User will not forge, or otherwise manipulate any personal or non-personal information and will provide it in the form and format requested by the {} and in accordance with the applicable law."
        validate={validation.required}
        multiline={false}
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

export default reduxForm<{}, IThirdPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(ThirdPage);
