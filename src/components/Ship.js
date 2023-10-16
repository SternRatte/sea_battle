import React, {useState} from 'react';
import  "../css/ships.css";
import {useSelector} from "react-redux";

const Ship = ({props}) => {

    const { id, x, y, size, name} = props;
    //const playerShips = useSelector(state => state.players.playerShips);
    const offsetX = x * (40 + 1)
    const offsetY = y * (40 + 1)
    const style = {};

   /* if (x !== -1){

            style.left = `${offsetX}px`;
            style.top = `${offsetY}px`;

    }else{
            style.top = `900px`;
    }*/


    return(
                            <div className={`${name} ship`}
                                 draggable={true}
                                 key={`${id}`}
                                 id={`${id}`}
                                data-size = {`${size}`}>
                            </div>
        )

    };

export default Ship;