import { useEffect, useState} from 'react';
import PlayingField from "../components/PlayingField";
import "../css/game.css"
import {useDispatch, useSelector} from "react-redux";
import {addNewShip} from "../js/placemantShips"
import Ship from "../components/Ship";
import {changeShipCoord} from "../store/playersReducer";

function Game() {

    useEffect(()=>{
        document.title = "Forward to victory!"
    },[])


    const userName = useSelector(state => state.score.userName);
    const playerShips = useSelector(state => state.players.playerShips);
    const dispatch = useDispatch();

    const [currentShip, setCurrentShip] = useState(null);

    function dragOverHandler(event){
        event.preventDefault();
        currentShip.style.opacity = '0.6';
    }

    function dragLeaveHandler(event){
        currentShip.style.opacity = '1';
    }


    function dragEndHandler(event){

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

    /*function setDirection(event){

            if (event.target.dataset.direction === "row"){
                event.target.dataset.direction = "column";
                event.target.classList.add('img-rotation');
            } else {
                event.target.dataset.direction = "row";
                event.target.classList.remove('img-rotation');
            }

    }*/

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
                         onDragEnd={(event) => dragEndHandler(event)}
                         draggable={true}
                    >
                        {playerShips.map(ship => {
                            return <Ship props = {ship}/>
                        })}
                    </div>
                </div>
                <div className="info">
                    <div>{userName}</div>
                    <button disabled>Начать игру</button>
                </div>
                <div className="opponent">
                    <PlayingField />
                </div>
            </div>

        </main>
    );
}
export default Game