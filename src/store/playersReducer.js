import {shipsGeneration} from "../js/placemantShips";

const defaultState = {

    botShips: shipsGeneration(),
    playerShips: [
        {id:"1",x:-1,y:-1, size:1,direction:"row",name:"one_deck"},
        {id:"2",x:-1,y:-1,size:1,direction:"row",name:"one_deck"},
        {id:"3",x:-1,y:-1,size:1,direction:"row",name:"one_deck"},
        {id:"4",x:-1,y:-1,size:1,direction:"row",name:"one_deck"},
        {id:"5",x:-1,y:-1,size:2,direction:"row",name:"two_deck"},
        {id:"6",x:-1,y:-1,size:2,direction:"row",name:"two_deck"},
        {id:"7",x:-1,y:-1,size:2,direction:"row",name:"two_deck"},
        {id:"8",x:-1,y:-1,size:3,direction:"row",name:"three_deck"},
        {id:"9",x:-1,y:-1,size:3,direction:"row",name:"three_deck"},
        {id:"10",x:-1,y:-1,size:4,direction:"row",name:"four_deck"}
    ],
    playerShots:[],
    botShots:[],
}

const CHANGE_COORD = "CHANGE_COORD";
const SET_SHIPS = "SET_SHIPS";
const ADD_SHOT = "ADD_SHOT";
const ADD_BOT_SHOT = "ADD_BOT_SHOT";
const RESET_ALL ="RESET_ALL";
export const playersReducer = (state=defaultState, action) => {
    switch (action.type) {
        case CHANGE_COORD:
            return { ...state, playerShips: state.playerShips.map(ship => {
                    if (ship.id === action.payload.id) {
                        ship.x = action.payload.x;
                        ship.y = action.payload.y;
                        ship.direction = action.payload.direction;
                    }
                    return ship;
                } ) }
        case SET_SHIPS:
            return { ...state, playerShips: action.payload}
        case ADD_SHOT:
            return { ...state, playerShots: [...state.playerShots, ...action.payload]}
        case ADD_BOT_SHOT:
            return { ...state, botShots: [...state.botShots, ...action.payload]}
        case RESET_ALL:
            return defaultState;
        default:
            return state
    }
}

export  const changeShipCoord = (payload) => ({type:CHANGE_COORD, payload});
export const  generatePlayerShips = (payload) => ({type:SET_SHIPS, payload});
export const addShot = (payload) => ({type:ADD_SHOT, payload});
export const addBotShot = (payload) => ({type:ADD_BOT_SHOT, payload});

export const resetState = () => ({type:RESET_ALL})