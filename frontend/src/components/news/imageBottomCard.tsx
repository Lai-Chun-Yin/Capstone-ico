import * as React from "react";

import { Card, CardBody, CardImg, CardSubtitle, CardText } from "reactstrap";

const ImageBottomCard = ({
  title,
  img,
  url,
  author,
  description,
  date
}: any) => {
  const dateObj = new Date(date);
  const dateString =
    dateObj.getUTCFullYear() +
    "/" +
    ("0" + (dateObj.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + dateObj.getUTCDate()).slice(-2) +
    " " +
    ("0" + dateObj.getUTCHours() + 8).slice(-2) +
    ":" +
    ("0" + dateObj.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + dateObj.getUTCSeconds()).slice(-2) +
    " GMT+8";

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
