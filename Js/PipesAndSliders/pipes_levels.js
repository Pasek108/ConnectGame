"use strict";

/**
 * Array of levels for Pipes gamemode 
 * 
 * Each level is 3D array of number and type
 * 
 * Number is decimal value that is converted binary number from array of connections stored as [top, right, bottom, left]
 * - connections [1, 0, 1, 1] is 1011 binary number
 * - 1011 = (8 * 1) + (4 * 0) + (2 * 1) + (1 * 1) = 11
 * - connections [1, 0, 1, 1] are saved as number 11
 * 
 * Type is:
 * - c - connection path
 * - d - destination
 * - s - source
 * @example
 * [
    [ [0, "c"],  [0, "c"],  [0, "c"],  [0, "c"], [0, "c"] ],
    [ [0, "c"],  [0, "c"],  [2, "d"],  [6, "c"], [1, "d"] ],
    [ [0, "c"],  [6, "c"],  [15, "s"], [9, "c"], [0, "c"] ],
    [ [4, "d"],  [9, "c"],  [10, "c"], [0, "c"], [0, "c"] ],
    [ [0, "c"],  [0, "c"],  [8, "d"],  [0, "c"], [0, "c"] ]
  ],
 * 
 */
const pipes_levels = [
  [
    [
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
    ],
    [
      [0, "c"],
      [0, "c"],
      [2, "d"],
      [6, "c"],
      [1, "d"],
    ],
    [
      [0, "c"],
      [6, "c"],
      [15, "s"],
      [9, "c"],
      [0, "c"],
    ],
    [
      [4, "d"],
      [9, "c"],
      [10, "c"],
      [0, "c"],
      [0, "c"],
    ],
    [
      [0, "c"],
      [0, "c"],
      [8, "d"],
      [0, "c"],
      [0, "c"],
    ],
  ],
  [
    [
      [6, "c"],
      [7, "c"],
      [5, "c"],
      [3, "c"],
      [0, "c"],
    ],
    [
      [8, "d"],
      [10, "c"],
      [4, "d"],
      [11, "c"],
      [0, "c"],
    ],
    [
      [4, "d"],
      [9, "s"],
      [0, "c"],
      [8, "d"],
      [0, "c"],
    ],
    [
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
    ],
    [
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
      [0, "c"],
    ],
  ],
  [
    [
      [6, "c"],
      [5, "c"],
      [7, "c"],
      [5, "c"],
      [3, "c"],
    ],
    [
      [14, "s"],
      [1, "d"],
      [8, "d"],
      [4, "d"],
      [11, "c"],
    ],
    [
      [12, "c"],
      [5, "c"],
      [5, "c"],
      [1, "d"],
      [10, "c"],
    ],
    [
      [0, "c"],
      [2, "d"],
      [2, "d"],
      [6, "c"],
      [9, "c"],
    ],
    [
      [0, "c"],
      [12, "c"],
      [13, "c"],
      [9, "c"],
      [0, "c"],
    ],
  ],
];
