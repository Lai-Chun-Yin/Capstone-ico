import * as React from "react";
import getDateTimeHK from "../../services/timeService";

import { Card, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";

const ImageBottomCard = ({
  title,
  img,
  url,
  author,
  description,
  date
}: any) => {
  const dateString = getDateTimeHK(date);

  return (
    <Card className="shadow border-0">
      <CardBody>
        <a href={url} target="_blank">
          <h3 className="card-title">{title}</h3>
        </a>
        <CardSubtitle>{author}</CardSubtitle>
        <CardText>{description}</CardText>
        <CardText className="text-muted">{dateString}</CardText>
      </CardBody>
      <a href={url} target="_blank">
        <CardImg bottom={true} width="100%" src={img} alt="Card image cap" />
      </a>
    </Card>
  );
};
export default ImageBottomCard;
