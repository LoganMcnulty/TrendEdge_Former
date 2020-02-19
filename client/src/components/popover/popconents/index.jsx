import React, { useState } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export function PopoverItem (props) {
    // console.log(props)
    const { id, item } = props;
    const [popoverOpen, setPopoverOpen] = useState(false);
    
    const toggle = () => setPopoverOpen(!popoverOpen);
    
    return (
        <span>
        <Button
            className="mr-1"
            color="secondary"
            id={"Popover-" + id}
            type="button"
        >
            <i className="fas fa-info-circle"></i>
        </Button>
        <Popover
            placement="left"
            isOpen={popoverOpen}
            target={"Popover-" + id}
            toggle={toggle}
            trigger="legacy"
        >
        <PopoverHeader></PopoverHeader>
        <PopoverBody>
            {props.popoverBody}
        </PopoverBody>
        </Popover>
        </span>
    );
};
  