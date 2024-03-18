import { findSquare, getPos, inBounds, deepIncludes } from "./utils.js"


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
 * Returns all the DOM pieces of the given color
 * @param {String} color "W" (White) or "B" (Black)
 * @returns {Array} Nested array of DOM Nodes
 */
export function getAllPieces(color) {
    let enemyPieces = []

    // Iterate through all chess tiles
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            // Either the chess piece element or null
            let pieceOrNull = findSquare(row, col).firstChild

            // If not null and matches the color passed
            if (pieceOrNull && pieceOrNull.dataset.color === color) {
                enemyPieces.push(pieceOrNull)
            }
        }
    }

    return enemyPieces
}


/**
 * Returns true if the square is being attacked by any piece of the given color
 * @param {Array} pos [row, col]
 * @param {String} color "W" (White) or "B" (Black)
 * @returns 
 */
export function isPosAttacked(pos, color) {
    let enemyPieces = getAllPieces(color)
    let attackedPositions = []

    // Push all enemy possible attack positions to attackedPositions
    for (const piece of enemyPieces) {
        attackedPositions.push(...getPossibleMoves(piece))
    }

    // If the passed position is in the attack array, return true
    return deepIncludes(pos, attackedPositions)
}


/**
 * Returns true if the king (of the color provided) is in check
 * @param {String} color "W" (White) or "B" (Black)
 * @returns {Boolean}
 */
export function isInCheck(color) {
    let possiblePieces = getAllPieces(color)
    let king = null
    
    for (const piece of possiblePieces) {
        if (piece.dataset.rank === "K") {
            king = piece
        }
    }

    let square = king.parentNode
    let pos = getPos(square)

    let enemyColor = color === "W" ? "B" : "W"
    
    return isPosAttacked(pos, enemyColor)
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