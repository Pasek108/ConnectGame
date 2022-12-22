"use strict";

class PipesGrid {
  constructor(tile_size, level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = GlobalUtils.copyArray(PipesUtils.decodeLevel(level));
    for (let i = 0; i < 100; i++) this.shuffleLevel();

    this.container = document.querySelector(".grid");
    this.container.innerHTML = "";
    this.setGridSize(tile_size);

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
          this.tiles[i][j].setConnected(PipesUtils.isConnectedToSource(i, j, this.level, visited_tiles));
        }
      }
    }
  }

  setGridSize(size) {
    this.container.className = `grid pipes size-${size}`;
    this.container.style.width = `${this.width * size + (this.width - 1) * 0.1}rem`;
    this.container.style.height = `${this.height * size + (this.height - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, ${size}rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, ${size}rem)`;
  }

  shuffleLevel() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const random_rotates = GlobalUtils.randomInt(0, 4);
        for (let k = 0; k < random_rotates; k++) this.rotateConnections(i, j);
      }
    }
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
          this.tiles[i][j].setConnected(PipesUtils.isConnectedToSource(i, j, this.level, visited_tiles));
        }
      }
    }

    if (PipesUtils.checkAllConnections(this.level)) this.win();
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j].blockActions();
      }
    }

    this.unlockNextLevel();
  }
}
