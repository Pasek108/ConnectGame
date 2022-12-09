"use strict";

class Editor extends View {
  constructor(container_class) {
    super(`.edit-screen .${container_class}`);

    this.container_class = container_class;
    this.empty_type = container_class === "pipes" ? "c" : "n";
    this.mode_class = container_class === "pipes" ? PipesUtils : SquaresUtils;

    /* ----------- grid size ----------- */
    this.grid = this.container.querySelector(".grid");
    this.grid_size = 3;
    this.size_input = this.container.querySelector(".size input");
    this.size_input.addEventListener("input", this.changeGridSize.bind(this));

    this.tile_size = this.container.querySelector(".tile-size");
    this.tile_size.addEventListener("input", this.changeTileSize.bind(this));
    this.tile_size.value = 6;

    /* ----------- level genaration ----------- */
    this.generate = this.container.querySelector(".generate");
    this.generate.addEventListener("click", this.generateLevel.bind(this));

    /* ----------- previews ----------- */
    this.previews = this.container.querySelectorAll(".preview");
    for (let i = 0; i < this.previews.length; i++) {
      // prettier-ignore
      switch(i) {
        case 0: this.previews[i].dataset.data = "0;0;0;0;" + this.empty_type; break;
        case 1: this.previews[i].dataset.data = "1;0;0;0;" + this.empty_type; break;
        case 2: this.previews[i].dataset.data = "1;1;0;0;" + this.empty_type; break;
        case 3: this.previews[i].dataset.data = "1;0;1;0;" + this.empty_type; break;
        case 4: this.previews[i].dataset.data = "1;1;1;0;" + this.empty_type; break;
        case 5: this.previews[i].dataset.data = "1;1;1;1;" + this.empty_type; break;
      }

      this.previews[i].addEventListener("dragstart", () => (this.dragged = this.previews[i]));
    }
  }

  load() {
    this.dragged = null;
    this.level = [];

    this.show();
    this.createGrid();
  }

  changeGridSize() {
    this.grid_size = +this.size_input.value;
    this.createGrid();
  }

  generateLevel() {
    this.level = Pipes.generateNewLevel(this.grid_size, this.grid_size);
  }

  /**
   * Changes tiles and previews size
   */
  changeTileSize() {
    for (let i = 0; i < this.previews.length; i++) {
      this.previews[i].className = `preview ${this.container_class} size-${this.tile_size.value}`;
      this.previews[i].style.width = `${this.tile_size.value}rem`;
      this.previews[i].style.height = `${this.tile_size.value}rem`;
    }

    this.grid.className = `grid ${this.container_class} size-${this.tile_size.value}`;
    this.grid.style.width = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.height = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
  }

  createGrid() {
    this.grid.innerHTML = "";
    this.changeTileSize();

    this.level = this.mode_class.createEmptyLevelArray(this.grid_size, this.grid_size);
    this.tiles = [];

    for (let i = 0; i < this.grid_size; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.grid_size; j++) {
        const tile = GlobalUtils.createNewDOM("div", "tile");
        tile.draggable = "true";
        tile.dataset.data = "0;0;0;0;" + this.empty_type;
        tile.addEventListener("click", (evt) => this.rotateTile(evt, i, j));
        tile.addEventListener("dragstart", () => (this.dragged = tile));
        tile.addEventListener("dragover", (evt) => evt.preventDefault());
        tile.addEventListener("drop", (evt) => this.dropOnTile(evt, i, j));

        this.grid.appendChild(tile);
        this.tiles[i].push(tile);
      }
    }
  }

  /**
   * Copy dragged tile data to the tile that is target of the drop, if dragged tile is from grid its content is
   * erased (tile from preview is copy pasted, tile from grid is cut pasted)
   * @param {DragEvent} evt
   * @param {*} y
   * @param {*} x
   */
  dropOnTile(evt, y, x) {
    evt.preventDefault();

    const drop_tile = evt.currentTarget;
    if (drop_tile === this.dragged) return;

    const data = this.dragged.dataset.data.split(";");
    this.level[y][x] = [+data[0], +data[1], +data[2], +data[3], data[4]];

    drop_tile.dataset.data = this.dragged.dataset.data;
    drop_tile.innerHTML = this.dragged.innerHTML;

    if (this.dragged.classList.contains("tile")) {
      this.dragged.dataset.data = "0;0;0;0;" + this.empty_type;
      this.dragged.innerHTML = "";

      for (let i = 0; i < this.tiles.length; i++) {
        for (let j = 0; j < this.tiles[i].length; j++) {
          if (this.tiles[i][j] === this.dragged) {
            this.level[i][j] = [0, 0, 0, 0, this.empty_type];
            i = this.tiles.length;
            break;
          }
        }
      }
    }
  }

  /**
   * Rotates connections of clicked tile in clockwise order
   * @param {MouseEvent} evt
   * @param {number} y
   * @param {number} x
   * @returns
   */
  rotateTile(evt, y, x) {
    const tile = evt.currentTarget;

    const data = tile.dataset.data.split(";");
    if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0) return;

    const temp = data[0];
    data[0] = data[3];
    data[3] = data[2];
    data[2] = data[1];
    data[1] = temp;

    tile.dataset.data = data.join(";");
    tile.innerHTML = "";

    this.level[y][x] = [+data[0], +data[1], +data[2], +data[3], data[4]];
    const block = this.mode_class.createBlock([+data[0], +data[1], +data[2], +data[3], data[4]], true);
    tile.appendChild(block);
  }
}
