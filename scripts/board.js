import { initialLayout } from "./const.js";

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

        pieceImage.dataset.piece = rank
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
 * @param {*} ev 
 */
function drag(ev) {
    let piece = ev.target

    // The parent of the dragged chess icon is the chess square
    let parentPiece = piece.parentNode
    let row = parentPiece.dataset.row
    let col = parentPiece.dataset.col
    
    // Stores the position in a string where first digit is row and second digit is col
    ev.dataTransfer.setData("pos", `${row}${col}`)
} 

/**
 * When the dragged data is dropped, the chess piece element is moved to the according square
 * @param {Event} ev 
 */
function drop(ev) {
    // Prevent default behavior of open as link on drop
    ev.preventDefault()

    // Get the piece that was dragged
    let [row, col] = ev.dataTransfer.getData("pos").split("")
    let parentSquare = findSquare(parseInt(row), parseInt(col))
    let piece = parentSquare.firstChild

    // Check if the piece being moved matches the current type
    if (piece.dataset.color !== currentTurn) {
        return;
    }

    // Place it on the new chess square
    ev.target.appendChild(piece)

    // Switch turns
    currentTurn = currentTurn === "W" ? "B" : "W";
}

/**
 * Returns the chess square DOM element given the row and col numbers
 * @param {Int} row 
 * @param {Int} col 
 * @returns Chess square DOM element
*/
function findSquare(row, col) {
    let squares = document.querySelectorAll(".chess-square");
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        if (parseInt(square.dataset.row) === row && parseInt(square.dataset.col) === col) {
            return square
        }
    }
    return null
}