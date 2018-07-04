import React from "react";

import { DropdownItem } from "reactstrap";

const DropDownItem = (props) => (
  <DropdownItem className="drop-down" onClick={() => props.specificBrewery(props.brewery)}>{props.brewery}</DropdownItem>
);

export default DropDownItem;