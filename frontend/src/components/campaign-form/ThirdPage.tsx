import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validate from "./validate";
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

const renderColorSelector = ({ input, meta: { touched, error } }: any) => {
  return (
    <div>
      <select {...input}>
        <option value="">Select a color...</option>
        {colors.map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export interface IThirdPageProps {
  previousPage: any;
}

const ThirdPage: React.ComponentType<
  IThirdPageProps & InjectedFormProps<{}, IThirdPageProps>
> = (props: any) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component={renderColorSelector} />
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
        </div>
      </div>
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

export default reduxForm<{}, IThirdPageProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "wizard",
  validate
})(ThirdPage);
