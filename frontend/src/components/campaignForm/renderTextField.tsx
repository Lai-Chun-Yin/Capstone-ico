import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface ITextFieldProps {
  helper: string;
  input: WrappedFieldInputProps;
  label: string;
  meta: WrappedFieldMetaProps;
  placeholder: string;
  multiline: boolean;
}

const RenderTextField: ComponentType<ITextFieldProps> = ({
  helper,
  input,
  label,
  meta: { touched, error },
  placeholder,
  multiline
}) => {
  return (
    <div className="col-10 mb-4">
      <TextField
        label={label}
        multiline={multiline}
        rowsMax="4"
        {...input}
        placeholder={placeholder}
        fullWidth={true}
        helperText={helper}
      />
      {touched &&
        error && <span className="m-1 text-danger">{"*" + error}</span>}
    </div>
  );
};

export default RenderTextField;
