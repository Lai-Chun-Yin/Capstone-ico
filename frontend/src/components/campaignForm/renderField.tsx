import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface IrenderFieldProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  label: any;
  type: any;
}

const IrenderField: ComponentType<IrenderFieldProps> = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default IrenderField;
