/**
 * Returns the chess square DOM element given the row and col numbers
 * @param {Int} row 
 * @param {Int} col 
 * @returns {Node} Chess square DOM element
*/
export function findSquare(row, col) {
    let squares = document.querySelectorAll(".chess-square");
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        if (parseInt(square.dataset.row) === row && parseInt(square.dataset.col) === col) {
            return square
        }
    }
    return null
}