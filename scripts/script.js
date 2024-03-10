import { initialLayout } from "./const.js";

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

        // Uses rank and color shortnames to quickly access images
        pieceImage.src = `./images/${color}${rank}.svg`
        pieceImage.classList.add("chess-icon")
        square.appendChild(pieceImage)
    }
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