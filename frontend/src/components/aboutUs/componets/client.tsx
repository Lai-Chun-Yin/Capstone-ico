import * as React from "react";

const Client = ({ client }: any) => {
  const { image } = client;

  return (
    <div className="brand-logo">
      <div className="brand-logo-inner">
        <img src={image} alt="Clients" />
      </div>
    </div>
  );
};

export default Client;
