document.addEventListener("DOMContentLoaded", () => {
    generateBoard()
    generatePieces()
})

// Variable names for piece ranks
const K = "K"
const Q = "Q"
const R = "R"
const B = "B"
const N = "N"
const P = "P"

// Variable names for piece colors
const b = "B"
const w = "W"

const initialLayout = [
    [0, 0, R, b], [0, 1, N, b], [0, 2, B, b], [0, 3, Q, b], [0, 4, K, b], [0, 5, B, b], [0, 6, N, b], [0, 7, R, b],
    [1, 0, P, b], [1, 1, P, b], [1, 2, P, b], [1, 3, P, b], [1, 4, P, b], [1, 5, P, b], [1, 6, P, b], [1, 7, P, b],
    [6, 0, P, w], [6, 1, P, w], [6, 2, P, w], [6, 3, P, w], [6, 4, P, w], [6, 5, P, w], [6, 6, P, w], [6, 7, P, w],
    [7, 0, R, w], [7, 1, N, w], [7, 2, B, w], [7, 3, Q, w], [7, 4, K, w], [7, 5, B, w], [7, 6, N, w], [7, 7, R, w]
]

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

function generatePieces() {
    for (let piece of initialLayout) {
        [row, col, rank, color] = piece
        let square = findSquare(row, col)
        let pieceImage = document.createElement("img")
        pieceImage.src = `./images/${color}${rank}.svg`
        pieceImage.classList.add("chess-icon")
        square.appendChild(pieceImage)
    }
}

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