"use strict";

class Grid {
  constructor(level, level_name, level_id) {
    this.level_name = level_name;
    this.level_id = level_id;
    this.height = level.length - 2;
    this.width = level[0].length - 2;
    this.size = this.width * this.height;
    this.level = this.copyGrid(level);
    for (let i = 0; i < 10; i++) this.shuffleGrid();

    this.container = document.querySelector(".grid");
    this.container.innerHTML = "";
    this.container.style.width = `${this.width * 5.2 + (this.width - 1) * 0.1}rem`;
    this.container.style.height = `${this.height * 5.2 + (this.height - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, 5.2rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, 5.2rem)`;

    this.tiles = [];

    for (let i = 1; i <= this.height; i++) {
      this.tiles.push([]);
      for (let j = 1; j <= this.width; j++) {
        this.tiles[i - 1].push(
          new Tile(
            this.container,
            this.level[i][j],
            this.checkCorrectConnections(i, j),
            () => this.tileClicked(i, j),
            (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y)
          )
        );
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
        if (this.level[i][j][4].includes("r")) {
          const random_rotates = randomInt(0, 4);
          for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j);
        }

        let random_y = i;
        let random_x = j;

        if (this.level[i][j][4].includes("v")) {
          random_y += randomInt(-this.height, this.height);
          if (random_y < 1) random_y = 1;
          else if (random_y > this.height) random_y = this.height;
        }

        if (this.level[i][j][4].includes("h")) {
          random_x += randomInt(-this.width, this.width);
          if (random_x < 1) random_x = 1;
          else if (random_x > this.width) random_x = this.width;
        }

        this.moveTile(i, j, random_y, random_x);
      }
    }
  }

  moveTile(i, j, new_i, new_j) {
    let is_new_pos_empty = true;
    for (let k = 0; k < 4; k++) {
      if (this.level[new_i][new_j][k] != 0) is_new_pos_empty = false;
    }

    if (is_new_pos_empty) {
      const temp = this.level[i][j];
      this.level[i][j] = this.level[new_i][new_j];
      this.level[new_i][new_j] = temp;
    }
  }

  checkCorrectConnections(i, j) {
    let correct_connections = [];

    const current_object = this.level[i][j];
    const top_object = this.level[i - 1][j];
    const right_object = this.level[i][j + 1];
    const bottom_object = this.level[i + 1][j];
    const left_object = this.level[i][j - 1];

    correct_connections.push(current_object[0] == top_object[2]);
    correct_connections.push(current_object[1] == right_object[3]);
    correct_connections.push(current_object[2] == bottom_object[0]);
    correct_connections.push(current_object[3] == left_object[1]);

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

  rotateConnections(i, j) {
    const last = this.level[i][j][3];
    for (let k = 3; k > 0; k--) this.level[i][j][k] = this.level[i][j][k - 1];
    this.level[i][j][0] = last;
  }

  updateConnections(i, j) {
    const current_tile = this.tiles[i - 1][j - 1];
    current_tile.setConnections(this.level[i][j], this.checkCorrectConnections(i, j));

    const adjacent_tiles_indexes = [
      { i: i - 2, j: j - 1 },
      { i: i - 1, j: j - 0 },
      { i: i - 0, j: j - 1 },
      { i: i - 1, j: j - 2 },
    ];

    for (let k = 0; k < 4; k++) {
      const p = adjacent_tiles_indexes[k].i;
      const q = adjacent_tiles_indexes[k].j;

      if (p >= 0 && p < this.height && q >= 0 && q < this.width) {
        this.tiles[p][q].setConnections(this.level[p + 1][q + 1], this.checkCorrectConnections(p + 1, q + 1));
      }
    }
  }

  tileClicked(i, j) {
    this.rotateConnections(i, j);
    this.updateConnections(i, j);
    
    if (this.checkAllConnections()) this.win();
  }

  tilePositionChanged(i, j, new_x, new_y) {
    const temp = this.level[i][j];

    new_x = new_x % 2 === 0 ? new_x / 2 : (new_x + (new_x % 2)) / 2;
    new_y = new_y % 2 === 0 ? new_y / 2 : (new_y + (new_y % 2)) / 2;

    let x = j + new_x, y = i + new_y;
    if (x > this.width) x = this.width;
    else if (x < 1) x = 1;

    if (y > this.height) y = this.height;
    else if (y < 1) y = 1;

    let no_connections = true;
    for (let k = 0; k < 4; k++) {
      if (this.level[y][x][k] != 0) {
        no_connections = false;
        break;
      }
    }

    if (no_connections) {
      this.level[i][j] = this.level[y][x];
      this.level[y][x] = temp;

      const clone = this.tiles[i - 1][j - 1].container.cloneNode();
      this.container.insertBefore(clone, this.tiles[i - 1][j - 1].container);
      this.container.insertBefore(this.tiles[i - 1][j - 1].container, this.tiles[y - 1][x - 1].container);
      this.container.insertBefore(this.tiles[y - 1][x - 1].container, clone);
      clone.remove();

      const temp_tile = this.tiles[i - 1][j - 1];
      this.tiles[i - 1][j - 1] = this.tiles[y - 1][x - 1];
      this.tiles[y - 1][x - 1] = temp_tile;

      this.tiles[i - 1][j - 1].setFunctions(() => this.tileClicked(i, j), (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y));
      this.tiles[y - 1][x - 1].setFunctions(() => this.tileClicked(y, x), (new_x, new_y) => this.tilePositionChanged(y, x, new_x, new_y));

      this.updateConnections(i, j);
      this.updateConnections(y, x);

      if (this.checkAllConnections()) this.win();
    }
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].blockActions();
      }
    }

    setTimeout(fireConfetti, 100);
    document.querySelector(".next").classList.remove("disabled");
    const completed_levels = parseInt(localStorage.getItem(this.level_name));
    if (completed_levels === this.level_id) localStorage.setItem(this.level_name, `${completed_levels + 1}`);
  }
}
