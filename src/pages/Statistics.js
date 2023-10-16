import React from 'react';
import {useSelector} from "react-redux";
import "../css/statistic.css"


const Statistic = () => {

    const winCount = useSelector(state => state.score.win);
    const loseCount = useSelector(state => state.score.lose);

    return(
        <main className="statistic_container">
            <h1>История битв</h1>
            <div className="head-t">
                <p>Количество битв</p>
                {winCount + loseCount}
                <p>Количество проигрышей</p>
                {loseCount}
                <p>Количество побед</p>
                {winCount}
            </div>
        </main>
    )
};

export default Statistic;