import { findSquare } from "./utils.js"

/**
 * Returns a nested array containing all current valid moves for the given piece
 * @param {Node} piece 
 * @returns {Array} Nested array 
 */
export function getPossibleMoves(piece) {
    switch (piece.dataset.rank) {
        case "P":
            validPawnMoves(piece)
            break
        case "B":
            console.log(validBishopMoves(piece))
            break
        case "R":
            console.log(validRookMoves(piece))
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
    let [row, col] = pos
    let [deltaRow, deltaCol] = direction
    let capture = false

    while (inBounds(row + deltaRow, col + deltaCol)) {
        // If an opponent piece has already been captured, break
        if (capture) { break }

        // Update the values of the pointers 
        row += deltaRow
        col += deltaCol

        // Conditions for when captures occur
        let hasPiece = findSquare(row, col).firstChild
        if (hasPiece && piece.dataset.color === hasPiece.dataset.color) { 
            break
        } else if (hasPiece) {
            capture = true
        }

        result.push([row, col])
    }

    return result
}

function validPawnMoves(piece) {

}

// MOVE TEST
/*
    let prev = [] (GLOBAL)
    prev.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
    result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
    prev = result
*/

/**
 * Returns all valid bishop moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validBishopMoves(piece) {
    let newPos = getNewPos(piece.parentNode)
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    let result = []

    // For each direction get all valid positions
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })
    return result
}

/**
 * Returns all valid rook moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validRookMoves(piece) {
    let newPos = getNewPos(piece.parentNode)
    let directions = [[0, -1], [-1, 0], [0, 1], [1, 0]]
    let result = []
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })
    return result
}
