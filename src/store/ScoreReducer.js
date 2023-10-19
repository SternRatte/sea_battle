const defaultState = {
    userName:"Pirat",
    gamesCount: 0,
    win:0,
    lose:0,
}

const SET_NAME = "SET_NAME"
const ADD_WIN = "ADD_WIN"
const ADD_LOSE = "ADD_LOSE"


export const ScoreReducer = (state=defaultState, action) => {
    switch (action.type) {
        case ADD_WIN:
            return { ...state, win: state.win + 1}
        case ADD_LOSE:
            return {...state, lose: state.lose + 1}
        case  SET_NAME:
            return {...state, userName: action.payload}
        default:
            return state
    }
}

export const setName= (payload) => ({type:SET_NAME, payload});
export const addWin= () => ({type:ADD_WIN});
export const addLose= () => ({type:ADD_LOSE});