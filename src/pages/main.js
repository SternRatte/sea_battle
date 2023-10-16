import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "../css/main.css";
import {useDispatch} from "react-redux";
function App() {

    useEffect(()=>{
        document.title = "Sea Battle"
    },[])

    const [login, setLogin] = useState('');
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const handleChange = event => {
        setLogin(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();

        if (login.trim().length !== 0) {
            navigate("/Sea-battle-game");
        } else {
            alert("Поле не может быть пустым!");
        }
    };

    return (
        <main className="App">
            <h1>Привет, пират!</h1>
            <p>Для начала игры введи своё имя:</p>
            <input type="text"
                   name="login"
                   onChange={handleChange}/>
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
        </main>
    );
}

export default App;