"use strict";

class BridgesUtils {
  constructor() {}

  static createEmptyLevelArray(width, height) {
    const new_level = [];

    for (let i = 0; i <= height; i++) {
      new_level.push([]);
      for (let j = 0; j <= width; j++) new_level[i].push(0);
    }

    return new_level;
  }

  static getAdjacentIslands(islands, y, x) {
    const height = islands.length;
    const width = islands[0].length;
    const adjacent_islands = [null, null, null, null];

    for (let k = y - 1; k >= 0; k--) {
      if (islands[k][x] != null && islands[k][x].active) {
        adjacent_islands[0] = islands[k][x];
        break;
      }
    }

    for (let k = x + 1; k < width; k++) {
      if (islands[y][k] != null && islands[y][k].active) {
        adjacent_islands[1] = islands[y][k];
        break;
      }
    }

    for (let k = y + 1; k < height; k++) {
      if (islands[k][x] != null && islands[k][x].active) {
        adjacent_islands[2] = islands[k][x];
        break;
      }
    }

    for (let k = x - 1; k >= 0; k--) {
      if (islands[y][k] != null && islands[y][k].active) {
        adjacent_islands[3] = islands[y][k];
        break;
      }
    }

    return adjacent_islands;
  }

  static isNewBridgeCrossing(islands, current_island, target_island) {
    const height = islands.length;
    const width = islands[0].length;

    let current_island_id = [0, 0];
    let target_island_id = [0, 0];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (islands[i][j] === current_island) current_island_id = [i, j];
        if (islands[i][j] === target_island) target_island_id = [i, j];
      }
    }

    let start = [];
    let end = [];

    if (current_island_id[0] < target_island_id[0] || current_island_id[1] < target_island_id[1]) {
      start = current_island_id;
      end = target_island_id;
    } else {
      start = target_island_id;
      end = current_island_id;
    }

    let axis = +!(start[1] === end[1]);

    for (let i = start[axis] + 1; i < end[axis]; i++) {
      const row = axis === 0 ? i : start[0];
      const column = axis === 0 ? start[1] : i;
      const adjacent = this.getAdjacentIslands(islands, row, column);

      for (let j = 0; j < 4; j++) {
        if (adjacent[j] == null) continue;

        if (j === 1 - axis || j === 3 - axis) {
          if (adjacent[j].connections[(j + 2) % 4] !== 0) return true;
        }
      }
    }

    return false;
  }

  static setAdjacentBridgesSizes(current_island, current_adjacent_islands) {
    const cip = current_island.getPosition(); // current_island_positions

    for (let i = 0; i < 4; i++) {
      if (current_adjacent_islands[i] == null) continue;

      const tip = current_adjacent_islands[i].getPosition(); // target_island_positions

      if (cip.left === tip.left) {
        if (cip.top < tip.top) current_adjacent_islands[i].setTopBridgeSize(cip);
        else current_island.setTopBridgeSize(tip);
      } else {
        if (cip.left < tip.left) current_adjacent_islands[i].setLeftBridgeSize(cip);
        else current_island.setLeftBridgeSize(tip);
      }
    }
  }

  static getClosestIslandAndFocusBridge(islands, current_island, current_adjacent_islands, pointer_positions) {
    const current_island_positions = current_island.getPosition();

    let distances = [
      Math.abs(current_island_positions.bottom - pointer_positions[0] + window.scrollY),
      Math.abs(current_island_positions.left - pointer_positions[1] + window.scrollX),
      Math.abs(current_island_positions.top - pointer_positions[0] + window.scrollY),
      Math.abs(current_island_positions.right - pointer_positions[1] + window.scrollX),
    ];

    let min_dist = distances[0];
    let min_side = 0;

    for (let k = 1; k < 4; k++) {
      if (distances[k] > min_dist) {
        min_dist = distances[k];
        min_side = k;
      }
    }

    current_island.unfocusTop();
    current_island.unfocusLeft();
    if (current_adjacent_islands[1] != null) current_adjacent_islands[1].unfocusLeft();
    if (current_adjacent_islands[2] != null) current_adjacent_islands[2].unfocusTop();

    for (let k = 0; k < 4; k++) {
      if (current_adjacent_islands[k] == null) continue;

      if (k === min_side && min_dist > current_island.container.offsetWidth * 1.3) {
        if (this.isNewBridgeCrossing(islands, current_island, current_adjacent_islands[k])) break;

        // prettier-ignore
        switch (k) {
          case 0: current_island.focusTop(); break;
          case 1: current_adjacent_islands[k].focusLeft(); break;
          case 2: current_adjacent_islands[k].focusTop(); break;
          case 3: current_island.focusLeft(); break;
        }

        return current_adjacent_islands[k];
      }
    }

    return current_island;
  }

  static addBridgeBetweenIslands(current_island, target_island) {
    const cip = current_island.getPosition(); // current_island_positions
    const tip = target_island.getPosition(); // target_island_positions

    if (cip.left === tip.left) {
      if (cip.top < tip.top) {
        target_island.addBridgeTop();
        current_island.changeConnection(2);
      } else {
        current_island.addBridgeTop();
        target_island.changeConnection(2);
      }
    } else {
      if (cip.left < tip.left) {
        target_island.addBridgeLeft();
        current_island.changeConnection(1);
      } else {
        current_island.addBridgeLeft();
        target_island.changeConnection(1);
      }
    }
  }

  static generateBridgesLevel(width, height) {
    let level = this.createEmptyLevelArray(width, height);

    let connections = [];
    for (let i = 0; i <= height; i++) {
      connections.push([]);
      for (let j = 0; j <= width; j++) connections[i].push([0, 0, 0, 0]);
    }

    let current_position = [GlobalUtils.randomInt(0, height), GlobalUtils.randomInt(0, width)];

    for (let i = 0; i <= 1000; i++) {
      for (let j = 0; j <= 1000; j++) {
        const side = GlobalUtils.randomInt(0, 3);
        const length = side % 2 ? GlobalUtils.randomInt(1, height - current_position[0] + 1) : GlobalUtils.randomInt(1, width - current_position[1] + 1);
        let new_position = current_position[side % 2];

        for (let k = 1; k <= length; k++) {
          const step = [-k, k, k, -k];
          const max = [height, width];

          if (current_position[side % 2] + step[side] < 0) {
            new_position = 0;
            break;
          }

          if (current_position[side % 2] + step[side] > max[side % 2]) {
            new_position = max[side % 2];
            break;
          }

          if (level[current_position[0] + step[side] * ((side + 1) % 2)][current_position[1] + step[side] * (side % 2)] > 0) {
            new_position = current_position[side % 2] + step[side];
            break;
          }

          if (k === length) {
            new_position = current_position[side % 2] + step[side];
            break;
          }
        }

        if (new_position !== current_position[side % 2]) {
          const old_position = [current_position[0], current_position[1]];
          const current_island = connections[current_position[0]][current_position[1]];

          if (current_island[side] === 2) continue;
          /*
            console.log("--------");
            console.log(current_position[0], current_position[1]);*/

          current_position[side % 2] = new_position;
          /*
            console.log(current_position[0], current_position[1]);
            console.log("--------");*/

          const new_island = connections[current_position[0]][current_position[1]];
          let is_crossing = false;

          if (level[current_position[0]][current_position[1]] === 0) {
            if (this.isNewBridgeCrossing(level, connections, width, height, current_island, new_island)) continue;

            const adjacent_islands = this.getAdjacentIslands(level, connections, current_position[0], current_position[1]);
            /*
              for (let k = 0; k < 4; k++) {
                if (adjacent_islands[k] == null) console.log(null, null, null, null)
                else console.log(adjacent_islands[k][0], adjacent_islands[k][1], adjacent_islands[k][2], adjacent_islands[k][3])
              }*/

            if (adjacent_islands[0] !== null && adjacent_islands[2] !== null) {
              if (adjacent_islands[0][2] > 0 && adjacent_islands[2][0] > 0) {
                new_island[0] = adjacent_islands[0][2];
                new_island[2] = adjacent_islands[2][0];
                if (side % 2 === 0) is_crossing = true;
              }
            }

            if (adjacent_islands[1] !== null && adjacent_islands[3] !== null) {
              if (adjacent_islands[1][3] > 0 && adjacent_islands[3][1] > 0) {
                new_island[1] = adjacent_islands[1][3];
                new_island[3] = adjacent_islands[3][1];
                if (side % 2 === 1) is_crossing = true;
              }
            }
          }

          if (!is_crossing) current_island[side] = (current_island[side] + 1) % 3;
          level[old_position[0]][old_position[1]] = current_island.reduce((prev, next) => prev + next);

          if (!is_crossing) new_island[(side + 2) % 4] = (new_island[(side + 2) % 4] + 1) % 3;
          level[current_position[0]][current_position[1]] = new_island.reduce((prev, next) => prev + next);
        }
      }
    }

    return level;
  }
}
