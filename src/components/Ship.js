import React, {useState} from 'react';
import  "../css/ships.css";

function setDirection(event, ship){
    if (ship.direction === "row"){
        ship.direction = "column";
        event.target.classList.add('img-rotation');
    } else {
        ship.direction = "row";
        event.target.classList.remove('img-rotation');
    }
}

const Ship = ({props}) => {

    const { id, size, name} = props;

    return(
        <div className={`${name} ship`}
             draggable={true}
             key={`${id}`}
             id={`${id}`}
             data-size = {`${size}`}
             onDoubleClick={(event) => setDirection(event, props)}>
        </div>
    )

    };

export default Ship;