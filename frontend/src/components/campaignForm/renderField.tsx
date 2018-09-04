import * as React from "react";

const renderField = (field: any) => (
  <div>
    <label>{field.input.placeholder}</label>
    <div>
      <input {...field.input} />
      {field.touched && field.error && <span>{field.error}</span>}
    </div>
  </div>
);

export default renderField;
