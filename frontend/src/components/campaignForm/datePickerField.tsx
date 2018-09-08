import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface IdatePickerProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  label: any;
}

const renderDatePicker: ComponentType<IdatePickerProps> = ({
  input,
  label,
  meta: { touched, error }
}) => {
  return (
    <div className="col-12 mb-3">
      <TextField
        id="date"
        label={label}
        type="date"
        {...input}
        InputLabelProps={{
          shrink: true
        }}
      />
      {touched &&
        error && <span className="m-1 text-danger">{"*" + error}</span>}
    </div>
  );
};

export default renderDatePicker;
