import * as React from "react";
import { ComponentType } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

// export interface IImageUploadProps {
//   input: WrappedFieldInputProps;
//   meta: WrappedFieldMetaProps;
//   label: any;
// }

const adaptFileEventToValue = delegate => e =>
  delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
// tslint:disable-next-line:no-unused-expression
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

export default FileInput;
