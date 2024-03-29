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


/**
 * Returns the row and column of the given square
 * @param {Node} square 
 * @returns {Array}
 */
export function getPos(square) {
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
export function inBounds(x, y) {
    return x <= 7 && x >= 0 && y <= 7 && y >= 0
}


/**
 * Built-in includes but with support for nested arrays
 * NOTE: May re-implement for arrays with arbitrary depth
 * @param {Array} array of X
 * @param {X} searchElement 
 * @returns {Boolean}
 */
export function deepIncludes(array, searchElement) {
    for (const element of searchElement) {
        if (array.length !== element.length) { 
            return false 
        }

        let same = true
        for (let i = 0; i < element.length; i++) {
            if (!(array[i] === element[i])) {
                same = false
            }
        }
        if (same) {
            return true
        }
    }

    return false
}


/**
 * Returns true if the arrays are equal; otherwise false.
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
}