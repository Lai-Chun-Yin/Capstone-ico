import { Button } from "@material-ui/core";
import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import * as validation from "./fieldLevelValidation";
import renderField from "./renderTextField";

export interface IFourthPageProps {
  previousPage: any;
}

const FourthPage: React.ComponentType<
  IFourthPageProps & InjectedFormProps<{}, IFourthPageProps>
> = (props: any) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit} className="row">
      <h1 className="entry-heading mb-4 col-12 text-center">
        4 of 4: token details
      </h1>
      <Field
        name="softCap"
        type="number"
        component={renderField}
        label="Soft Cap"
        placeholder="Soft Cap: eg 10"
        validate={[
          validation.required,
          validation.positiveNum,
          validation.tokenQuantity.validateSoftCap
        ]}
        multiline={false}
      />
      <Field
        name="hardCap"
        type="number"
        component={renderField}
        label="Hard Cap"
        placeholder="Hard Cap: eg 10"
        validate={[
          validation.required,
          validation.positiveNum,
          validation.tokenQuantity.validateHardCap
        ]}
        multiline={false}
      />
      <Field
        name="totalSupply"
        type="number"
        component={renderField}
        label="Total Supply"
        placeholder="Total Supply: eg 10000"
        validate={[
          validation.required,
          validation.positiveNum,
          validation.tokenQuantity.validateTotalSupply
        ]}
        multiline={false}
      />
      <Field
        name="tokenName"
        type="text"
        component={renderField}
        label="Token Name"
        placeholder="Token Name: eg Max Coin"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="decimalPlaces"
        type="number"
        component={renderField}
        label="Decimal Places"
        placeholder="Decimal Places: eg 5"
        validate={
          [validation.required,
            validation.positiveNum]
        }
        multiline={false}
      />
      <Field
        name="tokenSymbol"
        type="text"
        component={renderField}
        label="Token Symbol"
        placeholder="Decimal Places: eg MXC"
        validate={validation.required}
        multiline={false}
      />
      <Field
        name="conversionRatio"
        type="number"
        component={renderField}
        label="How many tokens can be exchanged for 1 ETH"
        placeholder="Decimal Places: eg 10"
        validate={[validation.required,validation.positiveNum]}
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
          disabled={pristine || submitting}
        >
          <i className="zmdi zmdi-arrow-right zmdi-hc-fw" />
          <span>Submit</span>
        </Button>
      </div>
    </form>
  );
};

export default reduxForm<{}, IFourthPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard"
})(FourthPage);
