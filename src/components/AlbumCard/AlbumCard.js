import React from "react";

import { Card, CardImg, CardBody,
    CardTitle, Button } from "reactstrap";
    
import "./AlbumCard.css";

const AlbumCard = (props) => {
    return (
        <div>
          <Card className="card">
            <CardImg top width="100%" src="http://via.placeholder.com/300x300" />
            <CardBody>
              <CardTitle className="card-title"> {props.breweryName}</CardTitle>
              <Button className="card-btn" onClick={() => props.breweryView(props.breweryName)}>Check out the Brews</Button>
            </CardBody>
          </Card>
        </div>
      );
}
  
export default AlbumCard;