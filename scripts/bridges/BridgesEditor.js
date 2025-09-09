"use strict";

class BridgesEditor extends Editor {
  constructor() {
    super("bridges");
  }

  load() {
    this.show();
    this.createGrid();
    this.createIslands();
  }

  generateLevel() {
    this.level = BridgesUtils.generateBridgesLevel(this.grid_size, this.grid_size);

    this.islands = [];

    for (let i = 0; i <= this.grid_size; i++) {
      this.islands.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        this.islands[i].push(new BridgesIsland(this.level[i][j], () => this.addAdjacentIslands(), (value) => (this.level[i][j] = value)));
        this.tiles[i][j].innerHTML = "";
        this.tiles[i][j].appendChild(this.islands[i][j].container);
      }
    }
  }

  changeGridSize() {
    super.changeGridSize();
    this.islands = null;
    this.createIslands();
  }

  createGrid() {
    this.grid.innerHTML = "";
    this.setGridSize();

    this.tiles = [];

    for (let i = 0; i <= this.grid_size; i++) {
      this.tiles.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        const tile = GlobalUtils.createNewDOM("div", "tile");
        this.grid.appendChild(tile);

        if (j === this.grid_size) tile.style.width = "0px";
        if (i === this.grid_size) tile.style.height = "0px";

        this.tiles[i].push(tile);
      }
    }
  }

  setGridSize() {
    this.grid.className = `grid bridges size-${this.tile_size.value}`;
    this.grid.style.width = `${this.grid_size * this.tile_size.value + 3}rem`;
    this.grid.style.height = `${this.grid_size * this.tile_size.value + 3}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.grid_size + 1}, ${this.tile_size.value}rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.grid_size + 1}, ${this.tile_size.value}rem)`;

    if (this.islands == null) return;

    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        if (this.islands[i][j] == null) continue;

        const adjacent_islands = BridgesUtils.getAdjacentIslands(this.islands, i, j);
        this.startBridge(this.islands[i][j], adjacent_islands);
      }
    }
  }

  createIslands() {
    this.islands = [];
    this.level = BridgesUtils.createEmptyLevelArray(this.grid_size, this.grid_size);

    for (let i = 0; i <= this.grid_size; i++) {
      this.islands.push([]);

      for (let j = 0; j <= this.grid_size; j++) {
        this.islands[i].push(new BridgesIsland(0, () => this.addAdjacentIslands(), (value) => (this.level[i][j] = value)));
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

        const adjacent_islands = BridgesUtils.getAdjacentIslands(this.islands, i, j);
        this.islands[i][j].addAdjacentIslands(adjacent_islands, (island, adjacent_islands) => this.startBridge(island, adjacent_islands));

        if (this.islands[i][j].just_activated) this.islands[i][j].resetAdjacentConnections();
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
  }
}
