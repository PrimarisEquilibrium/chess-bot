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

// [row, col, rank, color]
// Layout is: 
//  - 0, 0 top left corner
//  - 7, 7 bottom right corner
export const initialLayout = [
    [0, 0, R, b], [0, 1, N, b], [0, 2, B, b], [0, 3, Q, b], [0, 4, K, b], [0, 5, B, b], [0, 6, N, b], [0, 7, R, b],
    [1, 0, P, b], [1, 1, P, b], [1, 2, P, b], [1, 3, P, b], [1, 4, P, b], [1, 5, P, b], [1, 6, P, b], [1, 7, P, b],
    [6, 0, P, w], [6, 1, P, w], [6, 2, P, w], [6, 3, P, w], [6, 4, P, w], [6, 5, P, w], [6, 6, P, w], [6, 7, P, w],
    [7, 0, R, w], [7, 1, N, w], [7, 2, B, w], [7, 3, Q, w], [7, 4, K, w], [7, 5, B, w], [7, 6, N, w], [7, 7, R, w]
]

// Valid move positions
// [RANK]: [[top, right, bottom, left] - POSSIBLE MOVE, ...]
// eg. P: [[1, 0, 0, 0], [2, 0, 0, 0]]
export const validMoves = {
    P: [[1, 0, 0, 0], [2, 0, 0, 0]], // White pawn is neg, black pawn is pos
}