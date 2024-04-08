import { getAllPieces, getPos, deepIncludes, findSquare } from "./utils.js"
import { getPossibleMoves } from "./valid.js"

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
 * Returns a nested array with all moves (and the piece) that block check for the current turn.
 * @param {String} currentTurn 
 * @returns {Array}
 */
export function movesThatBlockCheck(currentTurn) {
    /**
     * Returns true if the piece blocks the check; otherwise false.
     * @param {Node} piece
     * @param {Node} droppedSquare
     * @param {String} currentTurn
     * @returns {Boolean}
     */
    function moveBlocksCheck(piece, droppedSquare, currentTurn) {
        // Create a temporary piece (cloned from the dragged piece) with no display
        let tempPiece = piece.cloneNode()
        tempPiece.style.display = "none"

        // If dropping the original piece stops the check the move is valid
        droppedSquare.appendChild(tempPiece)
        let isChecked = isInCheck(currentTurn)
        droppedSquare.removeChild(tempPiece)

        if (isChecked) {
            return false
        }

        return true
    }

    let result = []
    let pieces = getAllPieces(currentTurn)

    for (const piece of pieces) {
        let moves = getPossibleMoves(piece)
        for (const move of moves) {
            // If a move blocks check append it to the result array
            if (moveBlocksCheck(piece, findSquare(...move), currentTurn)) {
                result.push([piece, move])
            }
        }
    }

    return result
}