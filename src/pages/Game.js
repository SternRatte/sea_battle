import { useEffect, useState} from 'react';
import { useRef } from 'react';
import PlayingField from "../components/PlayingField";
import "../css/game.css"
import {useDispatch, useSelector} from "react-redux";
import {addNewShip, shipsGeneration} from "../js/placemantShips"
import Ship from "../components/Ship";
import {addBotShot, addShot, changeShipCoord, generatePlayerShips} from "../store/playersReducer";
import {generateBotShot, newShoot} from "../js/shots";
import Shot from "../components/Shot";
import {addLose, addWin} from "../store/ScoreReducer";


function Game() {

    useEffect(()=>{
        document.title = "Forward to victory!"
    },[])

    const userName = useSelector(state => state.score.userName);
    const playerShips = useSelector(state => state.players.playerShips);
    const botShips = useSelector(state => state.players.botShips);
    const playerShots = useSelector(state => state.players.playerShots);
    const botShots = useSelector(state => state.players.botShots);
    const dispatch = useDispatch();

    const [currentShip, setCurrentShip] = useState(null);
    const [statusTurn, setStatusTurn] = useState(null);
    const [score, setScore] = useState(0);
    const [botScore, setBotScore] = useState(0);

    const startBtnRef = useRef(null);
    const shotBtnRef = useRef(null);
    let playerTurn = Math.random() >= 0.5;

    function dragOverHandler(event){
        event.preventDefault();
        currentShip.style.opacity = '0.6';
    }

    function dragLeaveHandler(event){
        currentShip.style.opacity = '1';
    }

    function dragEnd(event){
        currentShip.style.opacity = '1';
    }

    function dragStartHandler(event){
        setCurrentShip(event.target);
        event.dataTransfer.setDragImage(event.target,10,20);
    }

    function dropHandler(event){
        event.preventDefault();
        if (event.target.hasAttribute('data-x')) {
            let {x, y} = event.target.dataset;
            let ship = {id:currentShip.id,x: Number(x), y: Number(y),
                size:currentShip.dataset.size,
                direction: playerShips[`${currentShip.id - 1}`].direction};
                if (addNewShip(playerShips, ship)) {
                    currentShip.style.margin = '0';
                    dispatch(changeShipCoord(ship));
                    event.target.append(currentShip);
            }
        }
        currentShip.style.opacity = '1';
    }

    function lose(){
        if (botScore == 20) {
            dispatch(addLose());
            return "Ты проиграл битву";
        }else if (score == 20){
            dispatch(addWin());
            return "Победа в сражении!";
        }else
            return false;
    }
    function startGame() {
            startBtnRef.current.textContent = "Сдаться";
            newTurn();
    }

    function newTurn() {
        let endGame = lose();
        if (endGame){
            setStatusTurn(endGame);
            return;
        }
        if (playerTurn) {
            setStatusTurn("Твой ход");
            shotBtnRef.current.style.pointerEvents = "auto";
        } else {
            setStatusTurn("Ход соперника");
            shotBtnRef.current.style.pointerEvents = "none";
            setTimeout(startBot, 3000);
        }
    }
    function startBot() {
        let {x,y} = generateBotShot(botShots);
        let {newShots, hitCount,} = newShoot(x,y, botShots, playerShips);
        if (hitCount){
            setBotScore((botScore) => botScore + hitCount);
        }
        if (newShots){
            dispatch(addBotShot(newShots));
            playerTurn = true;
            newTurn();
        }
    }

    function setShot(event) {
        let {newShots,hitCount} = newShoot(event.target.dataset.x,event.target.dataset.y, playerShots, botShips);
        if (hitCount){
            setScore((score) => score + hitCount);
        }
        if (newShots){
            dispatch(addShot(newShots));
            playerTurn = false;
            newTurn();
        }
    }

    return (
        <main className="game">
            <div className="fields_mode">
                <div className="player"
                     onDragOver={(event) => dragOverHandler(event)}
                     onDrop={event => dropHandler(event)}>
                    <PlayingField/>
                    {botShots.map(shot =>{
                        return (
                            <Shot props={shot}/>
                        )
                    })}
                    <div className="all_ships"
                         onDragLeave={(event) => dragLeaveHandler(event)}
                         onDragStart={(event) => dragStartHandler(event)}
                         onDragEnd={(event) => dragEnd(event)}
                         draggable={true}
                    >
                        {playerShips.map(ship => {
                            return <Ship props = {ship}/>
                        })}
                    </div>
                </div>
                <div className="info">
                    <h2>{userName}</h2>
                    <h3>{statusTurn}</h3>
                    <div>Score: {score}</div>
                    <button  ref={startBtnRef} disabled={!(playerShips.every(ship => ship.x !== -1))}
                             onClick={startGame} >Начать игру</button>
                </div>
                <div className="opponent" ref={shotBtnRef}
                onClick={event => setShot(event)}>
                    <PlayingField />
                    {playerShots.map(shot =>{
                        return (
                            <Shot props={shot}/>
                        )
                    })}
                </div>
            </div>

        </main>
    );
}
export default Game