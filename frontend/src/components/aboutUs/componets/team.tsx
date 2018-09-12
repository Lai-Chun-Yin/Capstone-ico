import Button from "@material-ui/core/Button";
import * as React from "react";

const Team = ({ team }: any) => {
  const { name, destination, description, image, github } = team;
  return (
    <div className="m-1">
      <div className="jr-card px-0 pt-sm-5 text-center">
        <img
          className="size-100 avatar-shadow rounded-circle mx-auto mb-2"
          src={image}
          alt="Team-member"
        />
        <div className="card-body bg-transparent">
          <h3 className="card-title">{name}</h3>
          <span className="post-designation">{destination}</span>
          <p className="card-text">{description}</p>
          <Button href={github} target="_blank" color="primary">
            <span>GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Team;
