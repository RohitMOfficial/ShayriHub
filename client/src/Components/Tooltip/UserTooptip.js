import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function UserTooltip(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  let email=props.info.email
  let _id=props.info._id;

  return (
    <>
      <Button ref={target} onClick={() => setShow(!show)}>
        {props.info.username}
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            _id:= {_id}
           Email:= {email}

            

          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default UserTooltip