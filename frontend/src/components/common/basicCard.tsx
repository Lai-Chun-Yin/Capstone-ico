import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";
import LinkButton from "./linkButton";

const BasicCard = ({
  image,
  title,
  subTitle,
  description,
  btnText,
  btnStyle = "bg-primary",
  toId
}: any) => {
  return (
    <Card className="shadow border-0">
      <CardImg
        top={true}
        width="100%"
        src={image}
        alt="Card image cap"
        className="home-card-img-top"
      />
      <CardBody>
        <h3 className="card-title">{title}</h3>
        <CardSubtitle>{subTitle}</CardSubtitle>
        <CardText>{description}</CardText>
        <LinkButton
          variant="raised"
          to={`/campaign/${toId}/details`}
          className={`${btnStyle} text-white`}
          component={Link}>
          {btnText}
        </LinkButton>
      </CardBody>
    </Card>
  );
};

export default BasicCard;
