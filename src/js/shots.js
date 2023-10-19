import {isValidCoordinates} from "./placemantShips";

export const newShoot = (x,y, shots, ships) => {

    let shot = {x:x, y:y, variant: "missed"};

    if (shots.find(shot => shot.x === x && shot.y === y)) {
        return false
    }

    let hitShip = null;
    let hitCount = 0;

    for (let ship of ships){
        let dx = ship.direction === 'row'
        let dy = ship.direction === 'column'
        for (let i = 0; i < ship.size; i++) {
            let x = ship.x + dx * i
            let y = ship.y + dy * i
            if (shot.x == x && shot.y == y) {
                shot.variant = "hit";
                hitShip = ship;
                hitCount++;
            }
        }
    }

    let newShots = [shot];

    if (shot.variant === "hit" ){
        let dx = hitShip.direction === 'row'
        let dy = hitShip.direction === 'column'

        for (let i = 0; i < hitShip.size; i++) {
            let x = hitShip.x + dx * i
            let y = hitShip.y + dy * i
            if (shots.find(shot => shot.x == x && shot.y == y)){
                hitCount++;
            }
        }

        if (hitCount == hitShip.size) {

            for (let y = hitShip.y - 1; y <= hitShip.y + hitShip.size * dy + dx; y++) {
                for (let x = hitShip.x - 1; x <= hitShip.x + hitShip.size * dx + dy; x++) {
                    if (isValidCoordinates(x, y) && [...shots, shot].every(shot => !(shot.x == x && shot.y == y))) {
                        newShots.push({x: x, y: y, variant: "missed"});
                    }
                }
            }

            return {newShots, hitCount};
        }
    }

    return {newShots};
}

export const generateBotShot = (botShots) => {
    let x,y;
    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }while (botShots.find(shot => (shot.x == x && shot.y == y)))

    return {x,y};
}