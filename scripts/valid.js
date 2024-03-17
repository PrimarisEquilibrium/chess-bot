import { findSquare, getPos, inBounds } from "./utils.js"


/**
 * Returns a nested array containing all current valid moves for the given piece
 * @param {Node} piece 
 * @returns {Array} Nested array 
 */
export function getPossibleMoves(piece) {
    switch (piece.dataset.rank) {
        case "P":
            return validPawnMoves(piece)
        case "B":
            return validBishopMoves(piece)
        case "R":
            return validRookMoves(piece)
        case "Q":
            return validQueenMoves(piece)
        case "K":
            return validKingMoves(piece)
        case "N":
            return validKnightMoves(piece)
    }
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


/**
 * Returns all valid pawn moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validPawnMoves(piece) {
    let result = []
    let [row, col] = getPos(piece.parentNode)
    let hasMoved = piece.dataset.notMoved === "true" ? true : false

    // If there is an opponent piece, push it to result
    function checkAndPush(rowOffset, colOffset) {
        let [newRow, newCol] = [row + rowOffset, col + colOffset]
        if (inBounds(newRow, newCol)) {
            let adjSquare = findSquare(newRow, newCol)
            if (
                adjSquare.firstChild && 
                adjSquare.firstChild.dataset.color !== piece.dataset.color
            ) {
                result.push([newRow, newCol])
            }
        }
    }
    
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

    return result
}


/**
 * Returns all valid king moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validKingMoves(piece) {
    let result = []
    let [row, col] = getPos(piece.parentNode)
    function checkAndPush(rowOffset, colOffset) {
        let [newRow, newCol] = [row + rowOffset, col + colOffset]
        if (inBounds(newRow, newCol)) {
            let adjSquare = findSquare(newRow, newCol)
            // If the adjsquare is empty or there is an opponent piece,
            // push it to result
            if (
                !adjSquare.firstChild ||
                adjSquare.firstChild.dataset.color !== piece.dataset.color
            ) {
                result.push([newRow, newCol])
            }
        }
    }

    let directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        [0, -1], [-1, 0], [0, 1], [1, 0]
    ]
    directions.forEach(dir => checkAndPush(...dir))

    return result
}


/**
 * Returns all valid bishop moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validBishopMoves(piece) {
    let newPos = getPos(piece.parentNode)
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    let result = []

    // For each direction get all valid positions
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })

    return result
}


/**
 * Returns all valid knight moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validKnightMoves(piece) {
    let result = []
    let [row, col] = getPos(piece.parentNode)
    function checkAndPush(rowOffset, colOffset) {
        let [newRow, newCol] = [row + rowOffset, col + colOffset]
        if (inBounds(newRow, newCol)) {
            let adjSquare = findSquare(newRow, newCol)
            if (
                !adjSquare.firstChild ||
                adjSquare.firstChild.dataset.color !== piece.dataset.color
            ) {
                result.push([newRow, newCol])
            }
        }
    }

    let directions = [
        [2, 1], [2, -1], [-2, 1], [-2, -1], 
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ]
    directions.forEach(dir => checkAndPush(...dir))
    return result
}


/**
 * Returns all valid rook moves
 * @param {Node} piece 
 * @returns {Array}
 */
function validRookMoves(piece) {
    let newPos = getPos(piece.parentNode)
    let directions = [[0, -1], [-1, 0], [0, 1], [1, 0]]
    let result = []
    directions.forEach(direction => {
        result = result.concat(getValidPosFromDir(piece, newPos, direction))
    })
    return result
}


/**
 * Returns all valid queen moves
 * @param {Node} piece 
 * @returns {Array}
 */
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
    return result
}