import * as React from "react";

interface IInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: any) => void;
  error: string;
  type?: string;
}

class Input extends React.Component<IInputProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { name, label, value, onChange, error, type = "text" } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          className="form-control"
          id={name}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
