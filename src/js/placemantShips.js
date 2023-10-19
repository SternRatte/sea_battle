export const isValidCoordinates = (x, y) => 0 <= x && x < 10 && 0 <= y && y < 10;

const generateRandomCoord = () => {
    let randomStartX = Math.floor(Math.random() * 10);
    let randomStartY = Math.floor(Math.random() * 10);
    const direction = ['row', 'column'][Math.floor(Math.random() * 2)];
    return{x:randomStartX, y:randomStartY, direction:direction};
}

const  createShip = (el) =>{
    let ship = generateRandomCoord();
    ship.size= el;
    return ship;
}

export const shipsGeneration = () => {

    let matrixField = createMatrix();
    let ships = [];

    let lengthShips = [4,3,3,2,2,2,1,1,1,1];

        for (let i=0; i<lengthShips.length; i++){
            let newShip;
            do {
                newShip = createShip(lengthShips[i]);
            }while(!checkShip(newShip, matrixField));
            ships.push(newShip);
        }

        return ships;
}


export const addNewShip = (ships, newShip) => {
    let matrixField = createMatrix(ships);
    return checkShip(newShip, matrixField);
}


const createMatrix = (ships) =>{

    let matrixField = Array(10)
    for (let i = 0; i < 10; i++) {
        matrixField[i] = new Array(10).fill(0)
    }

    if (ships) {
        ships.forEach(ship =>{
            const dx = ship.direction === "row";
            const dy = ship.direction === "column";

            if (isValidCoordinates(ship.x,ship.y)) {
                for (let i = 0; i < ship.size; i++) {
                    matrixField[ship.y + i * dy][ship.x + i * dx] = 1;
                }
            }
        })
        return matrixField;
    }
    return matrixField;
}

const checkShip = (ship, matrixField) => {

        const dx = ship.direction === "row";
        const dy = ship.direction === "column";

        if (matrixField[ship.y][ship.x] === 0) {
            for (let j = 0; j < ship.size; j++) {

                let x = ship.x + j * dx;
                let y = ship.y + j * dy;

                if (!isValidCoordinates(x, y) || matrixField[y][x] !== 0) {
                    return false;
                }
            }

            for (let y = ship.y - 1; y <= ship.y + ship.size * dy + dx; y++) {
                for (let x = ship.x - 1; x <= ship.x + ship.size * dx + dy; x++) {
                    if (isValidCoordinates(x, y) && matrixField[y][x] !== 0) {
                        return false;
                    }
                }
            }

            for (let i = 0; i < ship.size; i++) {
                matrixField[ship.y + i * dy][ship.x + i * dx] = 1;
            }
            return true;
        }

        return  false;
}


