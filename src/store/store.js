import {createStore, combineReducers } from "redux";
import {ScoreReducer} from "./ScoreReducer.js"
import {playersReducer} from "./playersReducer";

const reducers = {
    score: ScoreReducer,
    players: playersReducer,
}

const reducer = combineReducers(reducers)
export const store = createStore(reducer);