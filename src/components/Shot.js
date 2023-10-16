import React from 'react';
import  "../css/shot.css";

const Shot = ({props}) => {

    const {x,y, variant} = props;

    const style= {
        width: `40px`,
        height: `40px`,
        left: `${x * 44 + 21}px`,
        top: `${y * 44 +20}px`,
    }

    return(
        <div
            style={style}
            className={`${variant}`}
        />
    )
};

export default Shot;