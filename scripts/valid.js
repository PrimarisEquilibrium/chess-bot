export function validPawnMove(piece, currentPos, newPos) {
    // Coordinate positions are: row = y, column = x
    let [y1, x1] = currentPos
    let [y2, x2] = newPos
    
    let xDif = x1 - x2
    let yDif = y1 - y2

    // White pawns position decreases, black pawns position increases
    if (piece.dataset.color === "W") {
        if (yDif === 1 && xDif === 0) { return true }
    } else {
        if (yDif === -1 && xDif === 0) { return true }
    }

    return false
}

export function validRookMove(currentPos, newPos) {
    let [y1, x1] = currentPos
    let [y2, x2] = newPos
    
    let xDif = x1 - x2
    let yDif = y1 - y2

    if (yDif && xDif) { return false }

    return true
}