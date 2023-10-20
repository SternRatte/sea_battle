import {createStore, combineReducers } from "redux";
import {ScoreReducer} from "./ScoreReducer.js"
import {playersReducer} from "./playersReducer";
const saveToSessionStorage = (state) => {
    try {
        sessionStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

const loadFromSessionStorage = () => {
    try {
        const stateStr = sessionStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const reducers = {
    score: ScoreReducer,
    players: playersReducer,
}

const persistedStore = loadFromSessionStorage();
const reducer = combineReducers(reducers);
const store =createStore(reducer, persistedStore);
store.subscribe(() => {
    saveToSessionStorage(store.getState());
});
export default store
