import { findSquare } from "./utils.js"

/**
 * Returns a nested array containing all current valid moves for the given piece
 * @param {Node} piece 
 * @returns {Array} Nested array 
 */
export function getPossibleMoves(piece) {
    switch (piece.dataset.rank) {
        case "P":
            console.log(validPawnMoves(piece))
            break
        case "B":
            validBishopMoves(piece)
            break
        case "R":
            validRookMoves(piece)
            break
        case "Q":
            validQueenMoves(piece)
            break
    }
}

/**
 * Returns the row and column of the given square
 * @param {Node} square 
 * @returns {Array}
 */
function getPos(square) {
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

    console.log(result)
    return result
}

// MOVE TEST
/*
(GLOBAL)
    let prev = []
    prev.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
    result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
    prev = result
*/

const ENABLE_MOVE_HIGHLIGHTS = true

/**
 * Returns all valid pawn moves
 * @param {Node} piece 
 * @returns {Array}
 */
let prevP = []
function validPawnMoves(piece) {
    let result = []
    function checkAndPush(rowOffset, colOffset) {
        let adjSquare = findSquare(row + rowOffset, col + colOffset)
        if (adjSquare.firstChild) {
            result.push([row + rowOffset, col + colOffset])
        }
    }

    let [row, col] = getPos(piece.parentNode)
    let hasMoved = piece.dataset.notMoved === "true" ? true : false
    
    if (piece.dataset.color === "W") {
        // Diagonal capture case
        checkAndPush(1, -1)
        checkAndPush(1, 1)
        // Prevent moving forward to square ahead if it's occupied
        if (findSquare(row + 1, col).firstChild) {} 
        else {
            // If its the pawns first move, they are able to move two squares ahead
            if (hasMoved) {
                result.push([row + 2, col])
            }
            result.push([row + 1, col])
        }
    } else {
        checkAndPush(-1, 1)
        checkAndPush(-1, -1)
        // Inverse case for black
        if (findSquare(row - 1, col).firstChild) {} 
        else {
            if (hasMoved) {
                result.push([row - 2, col])
            }
            result.push([row - 1, col])
        }
    }

    if (hasMoved) {
        piece.dataset.notMoved = false
    }

    if (ENABLE_MOVE_HIGHLIGHTS) {
        prevP.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
        result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
        prevP = result
    }

    return result
}

/**
 * Returns all valid bishop moves
 * @param {Node} piece 
 * @returns {Array}
 */
let prevB = []
function validBishopMoves(piece) {
    let newPos = getPos(piece.parentNode)
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    let result = []

    // For each direction get all valid positions
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })

    if (ENABLE_MOVE_HIGHLIGHTS) {
        prevB.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
        result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
        prevB = result
    }

    return result
}

/**
 * Returns all valid rook moves
 * @param {Node} piece 
 * @returns {Array}
 */
let prevR = []
function validRookMoves(piece) {
    let newPos = getPos(piece.parentNode)
    let directions = [[0, -1], [-1, 0], [0, 1], [1, 0]]
    let result = []
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })

    if (ENABLE_MOVE_HIGHLIGHTS) {
        prevR.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
        result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
        prevR = result
    }

    return result
}

/**
 * Returns all valid queen moves
 * @param {Node} piece 
 * @returns {Array}
 */
let prevQ = []
function validQueenMoves(piece) {
    let newPos = getPos(piece.parentNode)
    let directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        [0, -1], [-1, 0], [0, 1], [1, 0]
    ]
    let result = []
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })

    if (ENABLE_MOVE_HIGHLIGHTS) {
        prevQ.forEach(res => findSquare(res[0], res[1]).style.opacity = 1)
        result.forEach(res => findSquare(res[0], res[1]).style.opacity = 0.5)
        prevQ = result
    }

    return result
}