const defaultState = {
    userName:"Pirat",
    gamesCount: 0,
    win:0,
    lose:0,
}

export const ScoreReducer = (state=defaultState, action) => {
    switch (action.type) {
        case "ADD_WIN":
            return { ...state, win: state.win + 1}
        case "ADD_LOSE":
            return {...state, lose: state.lose + 1}
        default:
            return state
    }
}