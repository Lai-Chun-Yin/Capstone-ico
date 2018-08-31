import * as React from "react";

const SearchBox = ({ placeholder, onChange, value }: any) => {
  return (
    <div className="search-bar right-side-icon bg-transparent d-none d-lg-block">
      <div className="form-group">
        <input
          className="form-control border-0"
          type="search"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button className="search-icon">
          <i className="zmdi zmdi-search zmdi-hc-lg" />
        </button>
      </div>
    </div>
  );
};
export default SearchBox;
