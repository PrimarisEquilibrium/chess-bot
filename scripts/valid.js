import { findSquare } from "./utils.js"

/**
 * Returns a nested array containing all current valid moves for the given piece
 * @param {Node} piece 
 * @returns {Array} Nested array 
 */
export function getPossibleMoves(piece) {
    switch (piece.dataset.rank) {
        case "P":
            validPawnMove(piece)
            break
        case "B":
            console.log(validBishopMove(piece))
            break
    }
}

/**
 * Returns the row and column of the given square
 * @param {Node} square 
 * @returns {Array}
 */
function getNewPos(square) {
    // Convert to int as datasets are strings
    return [
        parseInt(square.dataset.row),
        parseInt(square.dataset.col)
    ]
}

/**
 * Returns true if the position is within the chessboard
 * @param {Int} x col
 * @param {Int} y row
 * @returns {Boolean}
 */
function inBounds(x, y) {
    return x <= 7 && x >= 0 && y <= 7 && y >= 0
}

/**
 * For pieces that move an arbitrary amount in the given directions, returns
 * all coordinates in that continuous direction until the following conditions
 * are broken:
 *  - Out of bounds
 *  - Reaches its own piece
 *  - Captures an opponent piece
 * @param {Node} piece 
 * @param {Array} pos [row, col]
 * @param {Array} direction [deltaRow, deltaCol]
 * @returns {Array}
 */
function getValidPosFromDir(piece, pos, direction) {
    // Variable setup
    let result = []
    let [newX, newY] = pos
    let [deltaX, deltaY] = direction
    let capture = false

    while (inBounds(newX + deltaX, newY + deltaY)) {
        // If an opponent piece has already been captured, break
        if (capture) { break }

        // Update the values of the pointers 
        newX += deltaX
        newY += deltaY

        // Conditions for when captures occur
        let hasPiece = findSquare(newX, newY).firstChild
        if (hasPiece && piece.dataset.color === hasPiece.dataset.color) { 
            break
        } else if (hasPiece) {
            capture = true
        }

        result.push([newX, newY])
    }

    return result
}

function validPawnMove(piece) {

}

/**
 * Returns all valid bishop moves
 * @param {Node} piece 
 * @returns {Boolean}
 */
function validBishopMove(piece) {
    let newPos = getNewPos(piece.parentNode)
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    let result = []

    // For each direction get all valid positions
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })
    return result
}