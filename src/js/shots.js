export const newShoot = (x,y, shots, ships) => {

    let shot = {x:x, y:y, variant: "missed"};

    if (shots.find(shot => shot.x === x && shot.y === y)) {
        return false
    }

    for (let ship of ships){
        let dx = ship.direction === 'row'
        let dy = ship.direction === 'column'
        for (let i = 0; i < ship.size; i++) {
            let x = ship.x + dx * i
            let y = ship.y + dy * i
            if (shot.x == x && shot.y == y) {
                shot.variant = "hit";
            }
        }
    }
    return shot;

}