import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface IdatePickerProps {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
    label: any;
}

const IrenderDatePicker: ComponentType<IdatePickerProps> = ({
    input,
    label,
    meta: { touched, error }
}) => {
    return (
            <div>
                <label>{label}</label>
                <input type="date"
                    {...input}/>
                {touched && error && <span>{error}</span>}
            </div>

    );
};

export default IrenderDatePicker;