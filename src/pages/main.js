import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "../css/main.css";
import {useDispatch, useSelector} from "react-redux";
import {setName} from "../store/ScoreReducer";
function App() {

    useEffect(()=>{
        document.title = "Sea Battle"
    },[])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName =  useSelector(state => state.score.userName);
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
                           checked="checked" />
                    <span>Стрельба по очереди</span>
                </div>
                <div className="radio-g">
                    <input type="radio"
                           name="game_mode"/>
                    <span>Стрельба до промаха</span>
                </div>
                    <button onClick={handleClick}>Начать игру</button>
            </form>
        </main>
    );
}

export default App;