"use strict";

class SquaresGrid {
  constructor(level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = this.copyLevel(level);
    for (let i = 0; i < 100; i++) this.shuffleLevel();

    this.container = document.querySelector(".grid");
    this.container.className = "grid squares";
    this.container.innerHTML = "";
    this.container.style.width = `${this.width * 6 + (this.width - 1) * 0.1}rem`;
    this.container.style.height = `${this.height * 6 + (this.height - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, 6rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, 6rem)`;

    this.tiles = [];

    for (let i = 0; i < this.height; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width; j++) {
        this.tiles[i].push(
          new SquaresTile(
            this.level[i][j],
            this.checkCorrectConnections(i, j),
            () => this.tileClicked(i, j),
            (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y)
          )
        );

        this.container.appendChild(this.tiles[i][j].container);
      }
    }
  }

  copyLevel(level) {
    const level_copy = [];

    for (let i = 0; i < this.height; i++) {
      level_copy.push([]);

      for (let j = 0; j < this.width; j++) {
        level_copy[i].push([...level[i][j]]);
      }
    }

    return level_copy;
  }

  shuffleLevel() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4].includes("r")) {
          const random_rotates = randomInt(0, 4);
          for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j);
        }

        let y_position = i;
        let x_position = j;

        if (this.level[i][j][4].includes("v")) {
          y_position += randomInt(-this.height, this.height);

          if (y_position < 0) y_position = 0;
          else if (y_position >= this.height) y_position = this.height - 1;
        }

        if (this.level[i][j][4].includes("h")) {
          x_position += randomInt(-this.width, this.width);

          if (x_position < 0) x_position = 0;
          else if (x_position >= this.width) x_position = this.width - 1;
        }

        this.moveTile(i, j, y_position, x_position);
      }
    }
  }

  moveTile(y, x, new_y, new_x) {
    for (let k = 0; k < 4; k++) {
      if (this.level[new_y][new_x][k] != 0) return;
    }

    const temp = this.level[y][x];
    this.level[y][x] = this.level[new_y][new_x];
    this.level[new_y][new_x] = temp;
  }

  checkCorrectConnections(x, y) {
    let correct_connections = [];

    const current_block = this.level[x][y];
    const adjacent_blocks = [
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
      [0, 0, 0, 0, "n"],
    ];

    if (x - 1 >= 0) adjacent_blocks[0] = this.level[x - 1][y];
    if (x + 1 < this.width) adjacent_blocks[2] = this.level[x + 1][y];

    if (y - 1 >= 0) adjacent_blocks[3] = this.level[x][y - 1];
    if (y + 1 < this.height) adjacent_blocks[1] = this.level[x][y + 1];

    for (let i = 0; i < 4; i++) {
      correct_connections.push(current_block[i] == adjacent_blocks[i][(i + 2) % 4]);
    }

    return correct_connections;
  }

  checkAllConnections() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const connections = this.checkCorrectConnections(i, j);

        for (let k = 0; k < 4; k++) {
          if (!connections[k]) return false;
        }
      }
    }

    return true;
  }

  rotateConnections(y, x) {
    const last = this.level[y][x][3];
    for (let k = 3; k > 0; k--) this.level[y][x][k] = this.level[y][x][k - 1];
    this.level[y][x][0] = last;
  }

  updateConnections(y, x) {
    const current_tile = this.tiles[y][x];
    current_tile.setConnections(this.level[y][x], this.checkCorrectConnections(y, x));

    const adjacent_tiles_indexes = [
      { y: y - 1, x: x },
      { y: y, x: x + 1 },
      { y: y + 1, x: x },
      { y: y, x: x - 1 },
    ];

    for (let k = 0; k < 4; k++) {
      const p = adjacent_tiles_indexes[k].y;
      const q = adjacent_tiles_indexes[k].x;

      if (p >= 0 && p < this.height && q >= 0 && q < this.width) {
        this.tiles[p][q].setConnections(this.level[p][q], this.checkCorrectConnections(p, q));
      }
    }
  }

  tileClicked(y, x) {
    this.rotateConnections(y, x);
    this.updateConnections(y, x);

    if (this.checkAllConnections()) this.win();
  }

  tilePositionChanged(i, j, new_x, new_y) {
    const temp = this.level[i][j];

    new_x = (new_x + (new_x % 2)) / 2;
    new_y = (new_y + (new_y % 2)) / 2;

    let x = j + new_x;
    if (x >= this.width) x = this.width - 1;
    else if (x < 0) x = 0;

    let y = i + new_y;
    if (y >= this.height) y = this.height - 1;
    else if (y < 0) y = 0;

    for (let k = 0; k < 4; k++) {
      if (this.level[y][x][k] != 0) return;
    }

    this.level[i][j] = this.level[y][x];
    this.level[y][x] = temp;

    const clone = this.tiles[i][j].container.cloneNode();
    this.container.insertBefore(clone, this.tiles[i][j].container);
    this.container.insertBefore(this.tiles[i][j].container, this.tiles[y][x].container);
    this.container.insertBefore(this.tiles[y][x].container, clone);
    clone.remove();

    const temp_tile = this.tiles[i][j];
    this.tiles[i][j] = this.tiles[y][x];
    this.tiles[y][x] = temp_tile;

    this.tiles[i][j].setFunctions(
      () => this.tileClicked(i, j),
      (new_x, new_y) => this.tilePositionChanged(i, j, new_x, new_y)
    );

    this.tiles[y][x].setFunctions(
      () => this.tileClicked(y, x),
      (new_x, new_y) => this.tilePositionChanged(y, x, new_x, new_y)
    );

    this.updateConnections(i, j);
    this.updateConnections(y, x);

    if (this.checkAllConnections()) this.win();
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].blockActions();
      }
    }

    setTimeout(fireConfetti, 100);
    this.unlockNextLevel();
  }
}
