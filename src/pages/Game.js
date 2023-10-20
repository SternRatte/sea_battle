import { useEffect, useState} from 'react';
import { useRef } from 'react';
import PlayingField from "../components/PlayingField";
import "../css/game.css"
import {useDispatch, useSelector} from "react-redux";
import {addNewShip, shipsGeneration} from "../js/placemantShips"
import Ship from "../components/Ship";
import {addBotShot, addShot, changeShipCoord, generatePlayerShips, resetState} from "../store/playersReducer";
import {generateBotShot, newShoot} from "../js/shots";
import Shot from "../components/Shot";
import {addBotScore, addLose, addPlayerScore, addWin} from "../store/ScoreReducer";


function Game() {

    useEffect(()=>{
        document.title = "Forward to victory!"
    },[])

    const [isStart, setStart] = useState(true);
    const [isGiveUp, setGiveUp] = useState(false);

   useEffect(() => {
       setStart(JSON.parse(sessionStorage.getItem('isStart')));
       setGiveUp(JSON.parse(sessionStorage.getItem('isGiveUp')));
   },[])

    useEffect(() => {
        sessionStorage.setItem('isStart', JSON.stringify(isStart));
        sessionStorage.setItem('isGiveUp',JSON.stringify(isGiveUp));
    }, [isGiveUp, isStart]);


    const [playerTurn, setPlayerTurn] = useState(null);
    const score = useSelector(state => state.score.scorePlayer);
    const botScore = useSelector(state => state.score.scoreBot);

    useEffect (() => {
        if (playerTurn !== null) {
            let endGame = lose();
            if (endGame) {
                setStatusTurn(endGame);
                setPlayerTurn(null);
                return;
            }
            if (playerTurn) {
                setStatusTurn("Твой ход");
                shotBtnRef.current.style.pointerEvents = "auto";
            } else {
                setStatusTurn("Ход соперника");
                shotBtnRef.current.style.pointerEvents = "none";
                setTimeout(startBot, 2000);
            }
        }

    }, [playerTurn, botScore, score])

    const userName = useSelector(state => state.score.userName);
    const gameMode = useSelector(state => state.score.gameMode);
    const playerShips = useSelector(state => state.players.playerShips);
    const botShips = useSelector(state => state.players.botShips);
    const playerShots = useSelector(state => state.players.playerShots);
    const botShots = useSelector(state => state.players.botShots);
    const dispatch = useDispatch();

    const [currentShip, setCurrentShip] = useState(null);
    const [statusTurn, setStatusTurn] = useState(null);

    const shotBtnRef = useRef(null);

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
            }
        }
        currentShip.style.opacity = '1';
    }

    function setRandomShips(){
        let playerShip = shipsGeneration();
        dispatch(generatePlayerShips(playerShip));
    }

    function lose(){
        if (botScore === 20) {
            dispatch(addLose());
            setGiveUp(false);
            return "Ты проиграл битву";
        }else if (score === 20){
            dispatch(addWin());
            setGiveUp(false);
            return "Победа в сражении!";
        }else
            return false;
    }
    function startGame() {
            setStart(false);
            setPlayerTurn(Math.random() >= 0.5);
            setGiveUp(true);
    }

   function resetGame(){
        setStatusTurn("");
        setStart(true);
        setStatusTurn(null);
        dispatch(resetState());
        shotBtnRef.current.style.pointerEvents = "none";
        dispatch(addPlayerScore(-score));
        dispatch(addBotScore(-botScore));
        if (isGiveUp){
            dispatch(addLose());
            setGiveUp(false);
        }
    }

    function startBot() {
        let {x,y} = generateBotShot(botShots);
        let {newShots} = newShoot(x,y, botShots, playerShips);
        if (newShots[0].variant === "hit"){ dispatch(addBotScore(1))}
            dispatch(addBotShot(newShots));
            if (gameMode === "Стрельба по очереди" || newShots[0].variant === "missed"){
                setPlayerTurn(true);
            }
    }

    function setShot(event) {
        let {newShots} = newShoot(event.target.dataset.x,event.target.dataset.y, playerShots, botShips);
        if (newShots){
            dispatch(addShot(newShots));
            if (newShots[0].variant === "hit"){ dispatch(addPlayerScore(1))}

            if (gameMode === "Стрельба по очереди" || newShots[0].variant === "missed"){
                setPlayerTurn(false)
            }
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
                    <h3>Режим: {gameMode}</h3>
                    <h3>{statusTurn}</h3>
                    <div>Score: {score}</div>
                    {isStart && <button onClick={setRandomShips}>Выставить рандомно</button>}
                    {isStart && <button disabled={!(playerShips.every(ship => ship.x !== -1))}
                            onClick={startGame}>Начать игру</button>}
                    {isGiveUp && <button onClick={resetGame}>Сдаться</button>}
                    {!isStart && !isGiveUp && <button onClick={resetGame}>Играть ещё раз</button> }
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