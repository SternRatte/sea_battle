const defaultState = {
    userName:"Pirat",
    gameMode:"Стрельба по очереди",
    gamesCount: 0,
    scorePlayer:0,
    scoreBot: 0,
    win:0,
    lose:0,
}

const SET_NAME = "SET_NAME"
const ADD_WIN = "ADD_WIN"
const ADD_LOSE = "ADD_LOSE"
const SET_GAME_MODE = "SET_GAME_MODE"
const ADD_BOT_SCORE = "ADD_BOT_SCORE"
const ADD_PLAYER_SCORE = "ADD_PLAYER_SCORE"

export const ScoreReducer = (state=defaultState, action) => {
    switch (action.type) {
        case ADD_WIN:
            return { ...state, win: state.win + 1}
        case ADD_LOSE:
            return {...state, lose: state.lose + 1}
        case ADD_BOT_SCORE:
            return { ...state, scoreBot: state.scoreBot + action.payload}
        case ADD_PLAYER_SCORE:
            return {...state, scorePlayer: state.scorePlayer + action.payload}
        case  SET_NAME:
            return {...state, userName: action.payload}
        case SET_GAME_MODE:
            return {...state, gameMode: action.payload}
        default:
            return state
    }
}

export const setName= (payload) => ({type:SET_NAME, payload});
export const addWin= () => ({type:ADD_WIN});
export const addLose= () => ({type:ADD_LOSE});
export const addBotScore = (payload) => ({type:ADD_BOT_SCORE, payload});
export const addPlayerScore = (payload) => ({type:ADD_PLAYER_SCORE, payload});
export const setGameMode = (payload) => ({type:SET_GAME_MODE, payload});