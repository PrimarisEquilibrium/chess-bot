import { initialLayout } from "./const.js"
import { findSquare } from "./utils.js"
import { validPawnMove, validRookMove } from "./valid.js"

let currentTurn = "W" // "W for white; B for black"

// On page load generate the chess board and pieces
document.addEventListener("DOMContentLoaded", () => {
    generateBoard()
    generatePieces()
})

/**
 * Creates a chess board DOM element and appends it to the chess-container 
 */
function generateBoard() {
    let chessContainer = document.getElementById("chess-container")
    let currentColor = "light";

    for (let i = 0; i < 8; i++) {
        let chessRow = document.createElement("div")
        chessRow.classList.add("chess-row")

        // Create 8 squares in each row; squares are alternating in colors
        for (let j = 0; j < 8; j++) {
            let chessSquare = document.createElement("div")
            chessSquare.classList.add("chess-square")
            chessSquare.classList.add(currentColor)

            // Add dataset attributes for row and column properties
            chessSquare.dataset.row = i;
            chessSquare.dataset.col = j;

            // Add drag and drop logic to each chess square
            chessSquare.ondragover = allowDrop
            chessSquare.ondrop = drop

            // Alternate colors
            currentColor = currentColor === "light" ? "dark" : "light"
            chessRow.appendChild(chessSquare)
        }

        // Alternate colors for rows
        currentColor = currentColor === "light" ? "dark" : "light"
        chessContainer.appendChild(chessRow)
    }
}

/**
 * Modifies the current chessboard and adds the starting layout
 */
function generatePieces() {
    for (let piece of initialLayout) {
        let [row, col, rank, color] = piece
        let square = findSquare(row, col)

        let pieceImage = document.createElement("img")

        pieceImage.dataset.rank = rank
        pieceImage.dataset.color = color

        pieceImage.draggable = true
        pieceImage.ondragstart = drag

        // Uses rank and color shortnames to quickly access images
        pieceImage.src = `./images/${color}${rank}.svg`
        pieceImage.classList.add("chess-icon")
        square.appendChild(pieceImage)
    }
}

/**
 * Allows data/elements to be dropped in other elements
 * @param {Event} ev 
 */
function allowDrop(ev) {
    ev.preventDefault()
}

/**
 * Stores the dragged piece position in dataTransfer (storage method for drag and drop API)
 * @param {Event} ev 
 */
function drag(ev) {
    // The parent of the dragged chess icon is the chess square
    let square = ev.target.parentNode
    let row = square.dataset.row
    let col = square.dataset.col
    
    // Stores the position in a string where first digit is row and second digit is col
    ev.dataTransfer.setData("pos", `${row}${col}`)
} 

/**
 * Returns true if the move is valid; otherwise false. Valid moves are:
 *  - Correct turn
 *  - In possible moveset
 *  - Inbounds
 * @param {Node} piece
 * @param {[Int, Int]} currentPos
 * @param {[Int, Int]} newPos
 * @returns {Boolean} 
 */
function isValidMove(piece, currentPos, newPos) {
    // Check if the piece being moved matches the current type
    if (piece.dataset.color !== currentTurn) { return false }

    if (piece.dataset.rank === "P") {
        if (!validPawnMove(piece, currentPos, newPos)) { return false }
    } else if (piece.dataset.rank === "R") {
        if (!validRookMove(currentPos, newPos)) { return false }
    }

    return true

}

/**
 * Retrieves the dragged chess piece and its position
 * @param {Event} ev
 * @returns {Array} [piece, [row, col]]
 */
function getDraggedPiece(ev) {
    // Get the piece that was dragged
    let [row, col] = ev.dataTransfer.getData("pos").split("")
    let square = findSquare(parseInt(row), parseInt(col))
    let piece = square.firstChild

    // Get original piece position and new position
    let currentPos = [parseInt(row), parseInt(col)]
    return [piece, currentPos]
}

/**
 * When the dragged data is dropped, the chess piece element is moved to the according square
 * @param {Event} ev 
 */
function drop(ev) {
    // Prevent default behavior of open as link on drop
    ev.preventDefault()

    // Get the square element dropped onto
    let square = ev.target

    // Prevents square from being the chess piece element
    // (doesn't have row and col) dataset info
    if (square.tagName === "IMG") {
        square = ev.target.parentNode
    }

    // Get the piece and position that was dragged
    let [piece, currentPos] = getDraggedPiece(ev)
    let newPos = [
        parseInt(square.dataset.row), 
        parseInt(square.dataset.col)
    ]

    // Returns true if valid move, otherwise false
    if (!isValidMove(piece, currentPos, newPos)) { return }

    // If there is a piece on the position, capture it
    let opponentPiece = square.firstChild
    if (opponentPiece) {
        square.removeChild(opponentPiece)
    }

    // Place it on the new chess square
    square.appendChild(piece)

    // Switch turns
    currentTurn = currentTurn === "W" ? "B" : "W";
}