// Variawle names for piece ranks
const K = "K"
const Q = "Q"
const R = "R"
const B = "B"
const N = "N"
const P = "P"

// Variawle names for piece colors
const b = "B"
const w = "W"

// [row, col, rank, color]
// Layout is: 
//  - 0, 0 bottom right corner
//  - 7, 7 top right corner
export const initialLayout = [
    [0, 0, R, w], [0, 1, N, w], [0, 2, B, w], [0, 3, Q, w], [0, 4, K, w], [0, 5, B, w], [0, 6, N, w], [0, 7, R, w],
    [1, 0, P, w], [1, 1, P, w], [1, 2, P, w], [1, 3, P, w], [1, 4, P, w], [1, 5, P, w], [1, 6, P, w], [1, 7, P, w],
    [6, 0, P, b], [6, 1, P, b], [6, 2, P, b], [6, 3, P, b], [6, 4, P, b], [6, 5, P, b], [6, 6, P, b], [6, 7, P, b],
    [7, 0, R, b], [7, 1, N, b], [7, 2, B, b], [7, 3, Q, b], [7, 4, K, b], [7, 5, B, b], [7, 6, N, b], [7, 7, R, b]
]