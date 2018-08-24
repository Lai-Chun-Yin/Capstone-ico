import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

export interface IImageUploadProps {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
    label: any;
}

const IrenderImageUpload: ComponentType<IImageUploadProps> = ({
    input,
    label,
    meta: { touched, error }
}) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type="file" accept="image/*"/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );
};

export default IrenderImageUpload;