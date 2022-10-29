"use strict";

class PipesGrid {
  constructor(level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = this.copyLevel(level);
    for (let i = 0; i < 100; i++) this.shuffleLevel();

    this.container = document.querySelector(".grid");
    this.container.className = "grid pipes";
    this.container.innerHTML = "";
    this.container.style.width = `${this.width * 6 + (this.width - 1) * 0.1}rem`;
    this.container.style.height = `${this.height * 6 + (this.height - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, 6rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, 6rem)`;

    this.tiles = [];

    for (let i = 0; i < this.height; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width; j++) {
        this.tiles[i].push(new PipesTile(this.level[i][j], () => this.tileClicked(i, j)));
        this.container.appendChild(this.tiles[i][j].container);
      }
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(this.isConnectedToSource(i, j, visited_tiles));
        }
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
        const random_rotates = randomInt(0, 4);
        for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j);
      }
    }
  }

  checkCorrectConnections(x, y) {
    let correct_connections = [];

    const current_block = this.level[x][y];
    const adjacent_blocks = [
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
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

  isConnectedToSource(y, x, visited_tiles) {
    if (this.level[y][x][4] === "s") return true;

    const connections = this.checkCorrectConnections(y, x);
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
        if (connections[k] && this.level[p][q][(k + 2) % 4]) {
          if (visited_tiles.includes(`${p}${q}`)) continue;
          visited_tiles.push(`${p}${q}`);

          if (this.isConnectedToSource(p, q, visited_tiles)) return true;
        }
      }
    }

    return false;
  }

  rotateConnections(y, x) {
    const last = this.level[y][x][3];
    for (let k = 3; k > 0; k--) this.level[y][x][k] = this.level[y][x][k - 1];
    this.level[y][x][0] = last;
  }

  tileClicked(y, x) {
    this.rotateConnections(y, x);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(this.isConnectedToSource(i, j, visited_tiles));
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
    this.unlockNextLevel();
  }
}
