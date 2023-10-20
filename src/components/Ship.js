import React, {useState} from 'react';
import  "../css/ships.css";
import {useDispatch} from "react-redux";
import {changeShipCoord} from "../store/playersReducer";

const Ship = ({props}) => {

    const { id, x, y, direction, size, name} = props;
    const dispatch = useDispatch();
    let style;

    if (x !== -1){
        style= {
            position:"absolute",
            left: `${x * 44 + 20}px`,
            top: `${y * 44 + 15}px`,
        }
    }

    function setDirection(event, ship){
        if (ship.direction === "row"){
            ship.direction = "column";
            event.target.classList.add('column');
        } else {
            ship.direction = "row";
            event.target.classList.remove('column');
        }
        dispatch(changeShipCoord(ship));
    }


    return(
        <div className={`${name} ship ${direction}`}
             style={style}
             draggable={true}
             key={`${id}`}
             id={`${id}`}
             data-size = {`${size}`}
             onDoubleClick={(event) => setDirection(event, props)}>
        </div>
    )

    };

export default Ship;
