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
}

const CHANGE_COORD = "CHANGE_COORD";
export const playersReducer = (state=defaultState, action) => {
    switch (action.type) {
        case CHANGE_COORD:
            return { ...state, playerShips: state.playerShips.map(ship => {
                    if (ship.id === action.payload.id) {
                        ship.x = action.payload.x;
                        ship.y = action.payload.y;
                    }
                    return ship;
                } ) }
        default:
            return state
    }
}

export  const changeShipCoord = (payload) => ({type:CHANGE_COORD, payload});