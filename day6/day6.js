"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manhattan = require("compute-manhattan-distance");
// x, y
const input = `278, 314
    282, 265
    252, 59
    62, 70
    192, 100
    299, 172
    310, 347
    283, 113
    342, 59
    293, 260
    288, 264
    341, 161
    238, 80
    212, 240
    53, 250
    335, 219
    217, 231
    123, 307
    40, 261
    340, 291
    176, 145
    323, 323
    164, 216
    288, 268
    103, 234
    84, 220
    279, 320
    289, 237
    43, 279
    221, 114
    230, 131
    53, 81
    148, 292
    85, 137
    73, 70
    119, 152
    335, 177
    353, 167
    57, 196
    111, 112
    256, 228
    53, 358
    220, 301
    345, 45
    93, 339
    152, 328
    252, 189
    347, 315
    326, 178
    213, 173`;
/////////////////////////////////////////////////
console.log('Part 1');
//// Our matrix will be made up of numbers, with each number being the ID of
//// the closest point, except for -1 which is the uninitialized case.
function parseInput(input) {
    return input.split('\n').map((pointStr) => {
        let t = pointStr.split(',');
        return t.map((elem) => {
            return parseInt(elem, 10);
        });
    });
}
//function initializeMatrix(): number[][] {
//    const size = 1000;
//    let matrix: number[][] = [];
//    // fill with dots
//    for (let i = 0; i < size; i++) {
//        let line: number[] = [];
//        for (let j = 0; j < size; j++) {
//            line.push(-1);
//        }
//        matrix[i] = line;
//    }
//    return matrix;
//}
///**
// * Populates all cells with their nearest neighbors.
// * @param matrix
// */
//function fillMatrix(matrix: number[][]): number[][] {
//    for (let y = 0; y < matrix.length; y++) {
//        for (let x = 0; x < matrix[y].length; x++) {
//        }
//    }
//    return matrix;
//}
function getNearestNeighbor(x, y, points) {
    let nearestNeighbor;
    let shortestDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < points.length; i++) {
        let currDistance = manhattan([x, y], points[i]);
        if (currDistance < shortestDistance) {
            nearestNeighbor = i;
            shortestDistance = currDistance;
        }
        else if (currDistance == shortestDistance) {
            nearestNeighbor = -1;
        }
    }
    return nearestNeighbor;
}
function calcAreas(points, gridSize) {
    let areas = new Array(1000);
    areas.fill(0);
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let nearest = getNearestNeighbor(x, y, points);
            if (nearest == -1)
                continue;
            if (x == 0 || y == 0 || x == gridSize - 1 || y == gridSize - 1) {
                // set infinite area
                areas[nearest] = NaN;
                continue;
            }
            areas[nearest]++;
        }
    }
    return areas;
}
function getLargestArea(points) {
    const gridSize = 1000;
    let areas = calcAreas(points, gridSize).filter((elem) => !isNaN(elem));
    return Math.max(...areas);
}
const points = parseInput(input);
//let matrix = initializeMatrix();
//matrix = fillMatrix(matrix);
const area = getLargestArea(points);
console.log('Size of largest area:', area);
console.log('\n===========\n');
console.log('Part 2');
//# sourceMappingURL=day6.js.map