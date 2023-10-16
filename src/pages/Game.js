import { useEffect, useState} from 'react';
import { useRef } from 'react';
import PlayingField from "../components/PlayingField";
import "../css/game.css"
import {useDispatch, useSelector} from "react-redux";
import {addNewShip, shipsGeneration} from "../js/placemantShips"
import Ship from "../components/Ship";
import {addShot, changeShipCoord, generatePlayerShips} from "../store/playersReducer";
import shot from "../components/Shot";
import {newShoot} from "../js/shots";
import Shot from "../components/Shot";

function Game() {

    useEffect(()=>{
        document.title = "Forward to victory!"
    },[])


    const userName = useSelector(state => state.score.userName);
    const playerShips = useSelector(state => state.players.playerShips);
    const botShips = useSelector(state => state.players.botShips);
    const score = useSelector(state => state.score.scorePlay);
    const playerShots = useSelector(state => state.players.playerShots);
    const dispatch = useDispatch();

    const [currentShip, setCurrentShip] = useState(null);
    const startBtnRef = useRef(null);
    const shotBtnRef = useRef(null);

    function dragOverHandler(event){
        event.preventDefault();
        currentShip.style.opacity = '0.6';
    }

    function dragLeaveHandler(event){
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

    function startGame() {
        startBtnRef.current.textContent = "Сдаться";
        shotBtnRef.current.style.pointerEvents = "auto";
    }


    function setShot(event) {
        let shot = newShoot(event.target.dataset.x,event.target.dataset.y, playerShots, botShips);
        if (shot){
            dispatch(addShot(shot));
        }
    }

    return (
        <main className="game">
            <div className="fields_mode">
                <div className="player"
                     onDragOver={(event) => dragOverHandler(event)}
                     onDrop={event => dropHandler(event)}>
                    <PlayingField/>
                    <div className="all_ships"
                         onDragLeave={(event) => dragLeaveHandler(event)}
                         onDragStart={(event) => dragStartHandler(event)}
                         draggable={true}
                    >
                        {playerShips.map(ship => {
                            return <Ship props = {ship}/>
                        })}
                    </div>
                </div>
                <div className="info">
                    <h2>{userName}</h2>
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