"use strict";

class LinesGrid {
  constructor(level, mode_id, level_id) {
    this.mode_id = mode_id;
    this.level_id = level_id;
    this.height = level.length - 2;
    this.width = level[0].length - 2;
    this.size = this.width * this.height;
    this.level = this.copyGrid(level);
    for (let i = 0; i < 100; i++) this.shuffleGrid();

    this.container = document.querySelector(".grid");
    this.container.className = "grid lines";
    this.container.innerHTML = "";
    this.container.style.width = `${this.width * 6 + (this.width - 1) * 0.1}rem`;
    this.container.style.height = `${this.height * 6 + (this.height - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, 6rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, 6rem)`;

    this.tiles = [];

    for (let i = 1; i <= this.height; i++) {
      this.tiles.push([]);
      for (let j = 1; j <= this.width; j++) {
        this.tiles[i - 1].push(new LinesTile(this.container, this.level[i][j], () => this.tileClicked(i, j)));
      }
    }

    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        if (this.level[i][j][4] === "d") {
          if (this.isConnectedToSource(i, j, i, j)) this.tiles[i - 1][j - 1].setConnected(true);
          else this.tiles[i - 1][j - 1].setConnected(false);
        }
      }
    }
  }

  copyGrid(level) {
    const level_copy = [];

    for (let i = 0; i < level.length; i++) {
      level_copy.push([]);
      for (let j = 0; j < level[0].length; j++) {
        level_copy[i].push([...level[i][j]]);
      }
    }

    return level_copy;
  }

  shuffleGrid() {
    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        const random_rotates = randomInt(0, 4);
        for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j);
      }
    }
  }

  checkCorrectConnections(i, j) {
    let correct_connections = [];

    const current_object = this.level[i][j];
    const top_object = this.level[i - 1][j];
    const right_object = this.level[i][j + 1];
    const bottom_object = this.level[i + 1][j];
    const left_object = this.level[i][j - 1];

    correct_connections.push(current_object[0] === top_object[2]);
    correct_connections.push(current_object[1] === right_object[3]);
    correct_connections.push(current_object[2] === bottom_object[0]);
    correct_connections.push(current_object[3] === left_object[1]);

    return correct_connections;
  }

  checkAllConnections() {
    let all_correct = true;

    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        const connections = this.checkCorrectConnections(i, j);

        for (let k = 0; k < 4; k++) {
          if (!connections[k]) {
            all_correct = false;
            break;
          }
        }

        if (!all_correct) break;
      }

      if (!all_correct) break;
    }

    return all_correct;
  }

  isConnectedToSource(i, j, src_i, src_j) {
    /*
      start in destination tile, current = next
      func(current tile, previous tile)

      1. if current tile is source - SUCCES, bubble true
      2. if current tile is empty or outside board (just end of path) - FAIL, bubble false

      3. get correct connections of current tile (false = false or true = true)
      4. for all sides (top, right, bottom, left): 
      {
        1. if current side connection is true = true: 
        {
          // NOTE: next tile is current side tile, right side = check right tile connections
          1. if next tile is previous tile (infinite loop) - continue and check next side
          2. check path starting from next tile - func(next tile, current tile) - back to point 1, current = next, previous = current
            - if source found - SUCCES, bubble true 
            - if not - FAIL, continue and check next side
        }
      }

      5. if no result - FAIL, bubble false
    */

    // 1
    if (this.level[i][j][4] === "s") return true;

    // 2
    if (i < 1 || i > this.height || j < 1 || j > this.width) return false;
    if (!this.level[i][j].includes(true)) return false;

    // 3
    const connections = this.checkCorrectConnections(i, j);

    // 4
    for (let k = 0; k < 4; k++) {
      let connection = false;
      for (let l = 0; l < 4; l++) {
        if (this.level[i][j][l] && l === k) connection = true;
      }

      // 4.1
      if (connections[k] && connection) {
        const adjacent_tiles_indexes = [
          { i: i - 1, j: j },
          { i: i, j: j + 1 },
          { i: i + 1, j: j },
          { i: i, j: j - 1 },
        ];

        // 4.1.1
        if (adjacent_tiles_indexes[k].i === src_i && adjacent_tiles_indexes[k].j === src_j) continue;

        // 4.1.2
        if (this.isConnectedToSource(adjacent_tiles_indexes[k].i, adjacent_tiles_indexes[k].j, i, j)) return true;
      }
    }

    // 5
    return false;
  }

  rotateConnections(i, j) {
    const last = this.level[i][j][3];
    for (let k = 3; k > 0; k--) this.level[i][j][k] = this.level[i][j][k - 1];
    this.level[i][j][0] = last;
  }

  tileClicked(i, j) {
    this.rotateConnections(i, j);

    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        if (this.level[i][j][4] === "d") {
          if (this.isConnectedToSource(i, j, i, j)) this.tiles[i - 1][j - 1].setConnected(true);
          else this.tiles[i - 1][j - 1].setConnected(false);
        }
      }
    }

    if (this.checkAllConnections()) this.win();
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].blockActions();
      }
    }

    setTimeout(fireConfetti, 100);

    if (this.level_id < 200) {
      document.querySelector(".game .next").classList.remove("disabled");

      switch(this.mode_id) {
        case 1: completed_levels.bridges++; break;
        case 2: completed_levels.pipes++; break;
        case 3: completed_levels.sliders++; break;
      }

      modes_info.lines[this.mode_id - 1].completed_levels++;
      localStorage.setItem("completed_levels", JSON.stringify(completed_levels));
    }
  }
}
