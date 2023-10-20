import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "../css/main.css";
import {useDispatch, useSelector} from "react-redux";
import {setGameMode, setName} from "../store/ScoreReducer";
function App() {

    useEffect(()=>{
        document.title = "Sea Battle"
    },[])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName =  useSelector(state => state.score.userName);
    const gameMode = useSelector(state => state.score.gameMode)

    const handleChange = event => {
        dispatch(setName(event.target.value))
    };

    const handleClick = event => {
        event.preventDefault();
        if (userName.length !== 0) {
            navigate("/Sea-battle-game");
        } else {
           alert("Поле не может быть пустым!");
        }
    };

    const setMode = event => {
        dispatch(setGameMode(event.target.value));
    }

    return (
        <main className="App">
            <form>
                <h1>Привет, пират!</h1>
                <p>Для начала игры введи своё имя:</p>
                <input type="text"
                       name="login"
                       onChange={handleChange}
                value={userName}/>
                <p>Выбери режим игры:</p>
                <div className="radio-g">
                    <input type="radio"
                           name="game_mode"
                           checked="checked"
                           value="Стрельба по очереди"
                    onChange={setMode}/>
                    <span>Стрельба по очереди</span>
                </div>
                <div className="radio-g">
                    <input type="radio"
                           name="game_mode"
                           onChange={setMode}
                           value="Стрельба до промаха"/>
                    <span>Стрельба до промаха</span>
                </div>
                    <button onClick={handleClick}>Начать игру</button>
            </form>
        </main>
    );
}

export default App;