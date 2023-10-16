import "../css/header.css";
import {useState} from "react";
import Ship from '../img/ship.png';
import Modal from "../components/Modal";
import Rules from "../components/Rules";
import {Link} from "react-router-dom";

function Header() {

    const [modalActive, setModalActive] = useState(false);

    return (
        <header className="container_h">
            <Link to={"/"} className="logo" >
                <img src={Ship} className="ship_img" alt="ship"/>
                <h1>Sea Battle</h1>
            </Link>
            <div className="helper">
                <Link to={"/statistic-games"}>
                    <p>История битв</p>
                </Link>
                <button className="helper" onClick={() => setModalActive(true)}>Правила игры</button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <Rules/>
            </Modal>
        </header>
    );
}

export default Header;