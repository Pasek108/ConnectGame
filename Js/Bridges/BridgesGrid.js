"use strict";

class BridgesGrid {
  constructor(tile_size, level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = this.copyLevel(level);

    this.container = document.querySelector(".grid");
    this.container.innerHTML = "";
    this.setGridSize(tile_size);

    this.createTiles();
    this.createIslands();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] == null) continue;

        const adjacent_islands = this.getAdjacentIslands(i, j);
        this.islands[i][j].addAdjacentIslands(adjacent_islands, (island, adjacent_islands) => this.startBridge(island, adjacent_islands));
      }
    }

    window.addEventListener("mousemove", this.setClosestBridge.bind(this));
    window.addEventListener('touchmove', this.setClosestBridge.bind(this));
    window.addEventListener("mouseup", this.addBridge.bind(this));
    window.addEventListener("touchend", this.addBridge.bind(this));
  }

  setGridSize(size) {
    this.container.className = `grid bridges size-${size}`;
    this.container.style.width = `${(this.width - 1) * size + 3}rem`;
    this.container.style.height = `${(this.height - 1) * size + 3}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width}, ${size}rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height}, ${size}rem)`;

    if (this.islands == null) return;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] == null) continue;

        const adjacent_islands = this.getAdjacentIslands(i, j);
        this.startBridge(this.islands[i][j], adjacent_islands);
      }
    }
  }

  copyLevel(level) {
    const level_copy = [];

    for (let i = 0; i < this.height; i++) {
      level_copy.push([]);

      for (let j = 0; j < this.width; j++) {
        level_copy[i].push(level[i][j]);
      }
    }

    return level_copy;
  }

  createTiles() {
    this.tiles = [];

    for (let i = 0; i < this.height; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        this.container.appendChild(tile);

        if (j === this.width - 1) tile.style.width = "0px";
        if (i === this.height - 1) tile.style.height = "0px";

        this.tiles[i].push(tile);
      }
    }
  }

  createIslands() {
    this.islands = [];

    for (let i = 0; i < this.height; i++) {
      this.islands.push([]);

      for (let j = 0; j < this.width; j++) {
        if (!this.level[i][j]) {
          this.islands[i].push(null);
          continue;
        }

        this.islands[i].push(new BridgesIsland(this.level[i][j]));
        this.tiles[i][j].appendChild(this.islands[i][j].container);
      }
    }
  }

  getAdjacentIslands(i, j) {
    const adjacent_islands = [null, null, null, null];

    for (let k = i - 1; k >= 0; k--) {
      if (this.level[k][j]) {
        adjacent_islands[0] = this.islands[k][j];
        break;
      }
    }

    for (let k = j + 1; k < this.width; k++) {
      if (this.level[i][k]) {
        adjacent_islands[1] = this.islands[i][k];
        break;
      }
    }

    for (let k = i + 1; k < this.height; k++) {
      if (this.level[k][j]) {
        adjacent_islands[2] = this.islands[k][j];
        break;
      }
    }

    for (let k = j - 1; k >= 0; k--) {
      if (this.level[i][k]) {
        adjacent_islands[3] = this.islands[i][k];
        break;
      }
    }

    return adjacent_islands;
  }

  startBridge(island, adjacent_islands) {
    this.mouse_down = true;
    this.current_island = island;
    this.current_adjacent_islands = adjacent_islands;
    this.target_island = island;

    const cip = this.current_island.getPosition(); // current_island_positions

    for (let i = 0; i < 4; i++) {
      if (this.current_adjacent_islands[i] == null) continue;

      const tip = this.current_adjacent_islands[i].getPosition(); // target_island_positions

      if (cip.left === tip.left) {
        if (cip.top < tip.top) this.current_adjacent_islands[i].setTopBridgeSize(cip);
        else this.current_island.setTopBridgeSize(tip);
      } else {
        if (cip.left < tip.left) this.current_adjacent_islands[i].setLeftBridgeSize(cip);
        else this.current_island.setLeftBridgeSize(tip);
      }
    }
  }

  setClosestBridge(e) {
    if (!this.mouse_down) return;
    this.target_island = this.current_island;

    const current_island_positions = this.current_island.getPosition();

    const touches = e.changedTouches;
    let positions = [0, 0];

    if (touches == null) positions = [e.pageY, e.pageX];
    else positions = [touches[0].pageY, touches[0].pageX];

    let distances = [
      Math.abs(current_island_positions.bottom - positions[0] + window.scrollY),
      Math.abs(current_island_positions.left - positions[1] + window.scrollX),
      Math.abs(current_island_positions.top - positions[0] + window.scrollY),
      Math.abs(current_island_positions.right - positions[1] + window.scrollX),
    ];
    let min_dist = distances[0];
    let min_side = 0;

    for (let k = 1; k < 4; k++) {
      if (distances[k] > min_dist) {
        min_dist = distances[k];
        min_side = k;
      }
    }

    this.current_island.dehilightTop();
    this.current_island.dehilightLeft();

    for (let k = 0; k < 4; k++) {
      if (this.current_adjacent_islands[k] == null) continue;

      if (k === min_side && min_dist > this.current_island.container.offsetWidth * 1.3) {
        this.target_island = this.current_adjacent_islands[k];

        if (this.isNewBridgeCrossing()) {
          this.target_island = this.current_island;
          return;
        }

        this.current_adjacent_islands[k].focus();

        // prettier-ignore
        switch (k) {
          case 0: this.current_island.hilightTop(); break;
          case 1: this.target_island.hilightLeft(); break;
          case 2: this.target_island.hilightTop(); break;
          case 3: this.current_island.hilightLeft(); break;
        }
      } else {
        this.current_adjacent_islands[k].unfocus();
        this.current_adjacent_islands[k].dehilightTop();
        this.current_adjacent_islands[k].dehilightLeft();
      }
    }
  }

  isNewBridgeCrossing() {
    let current_island_id = [0, 0];
    let target_island_id = [0, 0];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] === this.current_island) current_island_id = [i, j];
        if (this.islands[i][j] === this.target_island) target_island_id = [i, j];
      }
    }

    let start = 0;
    let end = 0;

    if (current_island_id[0] < target_island_id[0] || current_island_id[1] < target_island_id[1]) {
      start = current_island_id;
      end = target_island_id;
    } else {
      start = target_island_id;
      end = current_island_id;
    }

    let axis = +!(start[1] === end[1]);

    for (let i = start[axis] + 1; i < end[axis]; i++) {
      const adjacent = axis === 0 ? this.getAdjacentIslands(i, start[1]) : this.getAdjacentIslands(start[0], i);

      for (let j = 0; j < 4; j++) {
        if (adjacent[j] == null) continue;

        if (j === 1 - axis || j === 3 - axis) {
          if (adjacent[j].connections[(j + 2) % 4] !== 0) return true;
        }
      }
    }

    return false;
  }

  addBridge() {
    if (!this.mouse_down) return;

    this.mouse_down = false;
    this.current_island.unfocus();

    if (this.target_island == this.current_island || this.target_island == null) return;

    for (let k = 0; k < 4; k++) {
      if (this.current_adjacent_islands[k] == null) continue;
      this.current_adjacent_islands[k].unfocus();
    }

    const cip = this.current_island.getPosition(); // current_island_positions
    const tip = this.target_island.getPosition(); // target_island_positions

    if (cip.left === tip.left) {
      if (cip.top < tip.top) {
        this.target_island.addBridgeTop();
        this.current_island.changeConnection(2);
      } else {
        this.current_island.addBridgeTop();
        this.target_island.changeConnection(2);
      }
    } else {
      if (cip.left < tip.left) {
        this.target_island.addBridgeLeft();
        this.current_island.changeConnection(1);
      } else {
        this.current_island.addBridgeLeft();
        this.target_island.changeConnection(1);
      }
    }

    this.target_island = null;
    this.checkIfWin();
  }

  checkIfWin() {
    let all_correct = true;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] == null) continue;

        if (!this.islands[i][j].correct) {
          all_correct = false;
          break;
        }
      }

      if (!all_correct) break;
    }

    if (all_correct) this.win();
  }

  win() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] == null) continue;
        this.islands[i][j].blockActions();
      }
    }

    setTimeout(fireConfetti, 100);
    this.unlockNextLevel();
  }
}
