import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface ITextAreaProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  label: any;
}

const IrenderTextArea: ComponentType<ITextAreaProps> = ({
    input,
    label,
    meta: { touched, error }
  }) => {
      return (
        <div>
            <label>{label}</label>
            <div>
                <textarea {...input} placeholder={label}/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
      );
  };

export default IrenderTextArea;