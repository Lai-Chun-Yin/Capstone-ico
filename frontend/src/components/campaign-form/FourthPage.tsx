import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import * as validation from "./fieldLevelValidation";
import renderField from "./renderField";

export interface IFourthPageProps {
  previousPage: any;
}

const FourthPage: React.ComponentType<
  IFourthPageProps & InjectedFormProps<{}, IFourthPageProps>
> = (props: any) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h2>4 of 4: token</h2>
      <Field
        name="totalSupply"
        type="number"
        component={renderField}
        label="Total Supply"
        validate={validation.required}
      />
      <Field
        name="tokenName"
        type="text"
        component={renderField}
        label="Token Name"
        validate={validation.required}
      />
      <Field
        name="decimalPlaces"
        type="number"
        component={renderField}
        label="Decimal Places"
        validate={validation.required}
      />
      <Field
        name="tokenSymbol"
        type="text"
        component={renderField}
        label="Token Symbol"
        validate={validation.required}
      />
      <Field
        name="conversionRatio"
        type="number"
        component={renderField}
        label="How many tokens can be exchanged for 1 ETH"
        validate={[validation.required,validation.positiveNum]}
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

export default reduxForm<{}, IFourthPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(FourthPage);