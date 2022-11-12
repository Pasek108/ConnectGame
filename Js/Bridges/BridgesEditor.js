"use strict";

class BridgesEditor {
  constructor() {
    this.container = document.querySelector(".edit-screen .bridges");
    this.dragged = null;
    this.level = [];

    // grid input
    this.grid = this.container.querySelector(".grid");
    this.grid_size = 4;
    this.size_input = this.container.querySelector(".size input");
    this.size_input.addEventListener("input", this.changeGridSize.bind(this));

    this.tile_size = this.container.querySelector(".tile-size");
    this.tile_size.addEventListener("input", this.setGridSize.bind(this));
    this.tile_size.value = 6;

    this.generate = this.container.querySelector(".generate");
    this.generate.addEventListener("click", this.generateLevel.bind(this));
  }

  hide() {
    this.container.classList.remove("active");
  }

  show() {
    this.container.classList.add("active");
  }

  load() {
    this.dragged = null;
    this.level = [];

    this.show();
    this.createGrid();
    this.createIslands();
  }

  generateLevel() {
    this.level = generateBridgesLevel(this.grid_size, this.grid_size);
    
    this.islands = [];

    for (let i = 0; i <= this.grid_size; i++) {
      this.islands.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        this.islands[i].push(new BridgesIsland(this.level[i][j], () => this.addAdjacentIslands(), (value) => this.level[i][j] = value));
        this.tiles[i][j].innerHTML = "";
        this.tiles[i][j].appendChild(this.islands[i][j].container);
      }
    }
  }

  changeGridSize() {
    this.grid_size = +this.size_input.value;
    this.islands = null;
    this.createGrid();
    this.createIslands();
  }

  createGrid() {
    this.grid.innerHTML = "";
    this.setGridSize()

    this.tiles = [];

    for (let i = 0; i <= this.grid_size; i++) {
      this.tiles.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        this.grid.appendChild(tile);

        if (j === this.grid_size) tile.style.width = "0px";
        if (i === this.grid_size) tile.style.height = "0px";

        this.tiles[i].push(tile);
      }
    }
  }

  setGridSize() {
    this.grid.className = `grid bridges size-${this.tile_size.value}`;
    this.grid.style.width = `${(this.grid_size + 1 - 1) * this.tile_size.value + 3}rem`;
    this.grid.style.height = `${(this.grid_size + 1 - 1) * this.tile_size.value + 3}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.grid_size + 1}, ${this.tile_size.value}rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.grid_size + 1}, ${this.tile_size.value}rem)`;
 
    if (this.islands == null) return;

    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        if (this.islands[i][j] == null) continue;

        const adjacent_islands = this.getAdjacentIslands(i, j);
        this.startBridge(this.islands[i][j], adjacent_islands);
      }
    }
  }

  createIslands() {
    this.islands = [];
    this.level = [];

    for (let i = 0; i <= this.grid_size; i++) {
      this.islands.push([]);
      this.level.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        this.level[i].push(0);
        this.islands[i].push(new BridgesIsland(0, () => this.addAdjacentIslands(), (value) => this.level[i][j] = value));
        this.tiles[i][j].appendChild(this.islands[i][j].container);
      }
    }

    window.addEventListener("mousemove", this.setClosestBridge.bind(this));
    window.addEventListener("mouseup", this.addBridge.bind(this));
  }

  addAdjacentIslands() {
    for (let i = 0; i <= this.grid_size; i++) {
      for (let j = 0; j <= this.grid_size; j++) {
        if (!this.islands[i][j].active) continue;

        this.islands[i][j].blockActions();

        const adjacent_islands = this.getAdjacentIslands(i, j);
        this.islands[i][j].addAdjacentIslands(adjacent_islands, (island, adjacent_islands) => this.startBridge(island, adjacent_islands));

        if (this.islands[i][j].just_activated) this.islands[i][j].resetAdjacentConnections();
      }
    }
  }

  getAdjacentIslands(i, j) {
    const adjacent_islands = [null, null, null, null];

    for (let k = i - 1; k >= 0; k--) {
      if (this.islands[k][j].active) {
        adjacent_islands[0] = this.islands[k][j];
        break;
      }
    }

    for (let k = j + 1; k <= this.grid_size; k++) {
      if (this.islands[i][k].active) {
        adjacent_islands[1] = this.islands[i][k];
        break;
      }
    }

    for (let k = i + 1; k <= this.grid_size; k++) {
      if (this.islands[k][j].active) {
        adjacent_islands[2] = this.islands[k][j];
        break;
      }
    }

    for (let k = j - 1; k >= 0; k--) {
      if (this.islands[i][k].active) {
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

    let distances = [
      Math.abs(current_island_positions.bottom - e.pageY + window.scrollY),
      Math.abs(current_island_positions.left - e.pageX + window.scrollX),
      Math.abs(current_island_positions.top - e.pageY + window.scrollY),
      Math.abs(current_island_positions.right - e.pageX + window.scrollX),
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

      if (k === min_side && min_dist > 40) {
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

    for (let i = 0; i <= this.grid_size; i++) {
      for (let j = 0; j <= this.grid_size; j++) {
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
  }
}
