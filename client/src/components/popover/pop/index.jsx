import React from "react";
import { PopoverItem } from '../popconents'

export function PopoverExampleMulti (props) {
  return (
    <>
      <PopoverItem 
      key={props.id} 
      item={props.id} 
      id={props.id}
      holdingsNames = {props.holdingsNames}
      holdingsPcts = {props.holdingsPcts}
      purpose = {props.purpose}
      popoverBody = {props.popoverBody}
      />
    </>
  );
};

export default PopoverExampleMulti;