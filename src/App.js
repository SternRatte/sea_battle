import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout"
import Main from "./pages/main.js"
import Game from "./pages/Game.js"
import Statistic from "./pages/Statistics.js"

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path="Sea-battle-game" element={<Game/>}/>
                    <Route path="statistic-games" element={<Statistic/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
