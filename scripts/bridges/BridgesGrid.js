"use strict";

class BridgesGrid {
  constructor(tile_size, level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = GlobalUtils.copyArray(level);

    this.container = document.querySelector(".grid");
    this.container.innerHTML = "";
    this.setGridSize(tile_size);

    this.createTiles();
    this.createIslands();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.islands[i][j] == null) continue;

        const adjacent_islands = BridgesUtils.getAdjacentIslands(this.islands, i, j);
        this.islands[i][j].addAdjacentIslands(adjacent_islands, (island, adjacent_islands) => this.startBridge(island, adjacent_islands));
      }
    }

    window.addEventListener("mousemove", this.setClosestBridge.bind(this));
    window.addEventListener("touchmove", this.setClosestBridge.bind(this));
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

        const adjacent_islands = BridgesUtils.getAdjacentIslands(this.islands, i, j);
        this.startBridge(this.islands[i][j], adjacent_islands);
      }
    }
  }

  createTiles() {
    this.tiles = [];

    for (let i = 0; i < this.height; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width; j++) {
        const tile = GlobalUtils.createNewDOM("div", "tile");
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

  startBridge(island, adjacent_islands) {
    this.mouse_down = true;
    this.current_island = island;
    this.current_adjacent_islands = adjacent_islands;
    this.target_island = island;

    BridgesUtils.setAdjacentBridgesSizes(this.current_island, this.current_adjacent_islands);
  }

  setClosestBridge(e) {
    if (!this.mouse_down) return;

    const touches = e.changedTouches;
    let positions = [0, 0];

    if (touches == null) positions = [e.pageY, e.pageX];
    else positions = [touches[0].pageY, touches[0].pageX];

    this.target_island = BridgesUtils.getClosestIslandAndFocusBridge(this.islands, this.current_island, this.current_adjacent_islands, positions);
  }

  addBridge() {
    if (!this.mouse_down) return;
    this.mouse_down = false;

    if (this.target_island == this.current_island || this.target_island == null) return;

    BridgesUtils.addBridgeBetweenIslands(this.current_island, this.target_island);
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

    this.unlockNextLevel();
  }
}
