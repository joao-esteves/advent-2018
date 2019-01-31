// x, y
const input =
    `278, 314
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

import * as manhattan from 'compute-manhattan-distance';

console.log('Part 1');

function parseInput(input: string): number[][] {
    return input.split('\n').map((pointStr: string) => {
        let t = pointStr.split(',');
        return t.map((elem: string) => {
            return parseInt(elem, 10);
        });
    });
}

function getNearestNeighbor(x: number, y: number, points: number[][]): number {
    let nearestNeighbor: number;
    let shortestDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < points.length; i++) {
        let currDistance = manhattan([x, y], points[i]);
        if (currDistance < shortestDistance) {
            nearestNeighbor = i;
            shortestDistance = currDistance;
        } else if (currDistance == shortestDistance) {
            nearestNeighbor = -1;
        }
    }
    return nearestNeighbor;
}


function calcAreas(points: number[][], gridSize: number): number[] {
    let areas: number[] = new Array(1000);
    areas.fill(0);
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let nearest: number = getNearestNeighbor(x, y, points);
            if (nearest == -1) continue;
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

function getLargestArea(points: number[][]): number {
    const gridSize = 1000;
    let areas: number[] = calcAreas(points, gridSize)
        .filter((elem: number) => !isNaN(elem));
    return Math.max(...areas);
}

const points: number[][] = parseInput(input);
const area: number = getLargestArea(points);

console.log('Size of largest area:', area);

console.log('\n===========\n');

console.log('Part 2');

function getTotalDistance(x: number, y: number, points: number[][]): number {
    let distance = 0;
    points.forEach((point: number[]) => {
        distance += manhattan([x, y], point);
    });
    return distance;
}

function getLargestSafeArea(points: number[][], safeDistance: number): number {
    const gridSize = 1000;
    let area = 0;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            let totalDistance = getTotalDistance(x, y, points);
            if (totalDistance < safeDistance) {
                area++;
            }
        }
    }
    return area;
}

const safeDistance = 10000;
const area2: number = getLargestSafeArea(points, safeDistance);

console.log('Area:', area2);