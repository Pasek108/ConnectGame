"use strict";

class SquaresEditor {
  constructor() {
    this.container = document.querySelector(".edit-screen .squares");
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

    // preview inputs
    this.type_input = this.container.querySelector(".type select");
    this.type_input.addEventListener("input", this.updatePreview.bind(this));

    this.top_connections_input = this.container.querySelector(".top input");
    this.top_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.right_connections_input = this.container.querySelector(".right input");
    this.right_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.bottom_connections_input = this.container.querySelector(".bottom input");
    this.bottom_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.left_connections_input = this.container.querySelector(".left input");
    this.left_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.preview = this.container.querySelector(".preview");
    this.preview.dataset.data = "0;0;0;0;n";
    this.preview.addEventListener("dragstart", () => (this.dragged = this.preview));
    this.preview.addEventListener("dragover", (evt) => evt.preventDefault());
    this.preview.addEventListener("drop", this.dropOnPreview.bind(this));
    this.preview.addEventListener("click", this.rotatePreviewBlock.bind(this));
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
    this.resetPreview();
  }

  generateLevel() {
    this.level = generateSquaresLevel(this.grid_size, this.grid_size);

    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        let is_empty = true;

        for (let k = 0; k < 4; k++) {
          if (this.level[i][j][k]) {
            is_empty = false;
            break;
          }
        }

        if (is_empty) {
          this.tiles[i][j].dataset.data = "0;0;0;0;n";
          this.tiles[i][j].innerHTML = "";
          continue;
        }

        const block = this.createBlock(this.level[i][j][4], this.level[i][j][0], this.level[i][j][1], this.level[i][j][2], this.level[i][j][3]);
        this.tiles[i][j].dataset.data = this.level[i][j].join(";");
        this.tiles[i][j].innerHTML = "";
        this.tiles[i][j].appendChild(block);
      }
    }
  }

  changeGridSize() {
    this.grid_size = this.size_input.value;
    this.createGrid();
  }

  createGrid() {
    this.grid.innerHTML = "";
    this.setGridSize();

    this.tiles = [];
    this.level = [];
    for (let i = 0; i < this.grid_size; i++) {
      this.level.push([]);
      this.tiles.push([]);

      for (let j = 0; j < this.grid_size; j++) {
        this.level[i].push([0, 0, 0, 0, "n"]);

        const tile = document.createElement("div");
        tile.className = "tile";
        tile.draggable = "true";
        tile.dataset.data = "0;0;0;0;n";
        tile.addEventListener("click", (evt) => this.rotateTile(evt, i, j));
        tile.addEventListener("dragstart", () => (this.dragged = tile));
        tile.addEventListener("dragover", (evt) => evt.preventDefault());
        tile.addEventListener("drop", (evt) => this.dropOnTile(evt, i, j));

        this.grid.appendChild(tile);
        this.tiles[i].push(tile);
      }
    }
  }

  setGridSize() {
    this.preview.className = `preview squares size-${this.tile_size.value}`;
    this.preview.style.width = `${this.tile_size.value}rem`;
    this.preview.style.height = `${this.tile_size.value}rem`;

    this.grid.className = `grid squares size-${this.tile_size.value}`;
    this.grid.style.width = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.height = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
  }

  updatePreview() {
    const type = this.type_input.value;
    const top = this.top_connections_input.value;
    const right = this.right_connections_input.value;
    const bottom = this.bottom_connections_input.value;
    const left = this.left_connections_input.value;

    this.preview.innerHTML = "";
    this.preview.dataset.data = `${top};${right};${bottom};${left};${type}`;

    if (top == 0 && right == 0 && bottom == 0 && left == 0) return;

    const block = this.createBlock(type, top, right, bottom, left);
    this.preview.appendChild(block);
  }

  rotatePreviewBlock() {
    const temp = this.top_connections_input.value;
    this.top_connections_input.value = this.left_connections_input.value;
    this.left_connections_input.value = this.bottom_connections_input.value;
    this.bottom_connections_input.value = this.right_connections_input.value;
    this.right_connections_input.value = temp;

    this.updatePreview();
  }

  dropOnPreview(evt) {
    evt.preventDefault();

    const data = this.dragged.dataset.data.split(";");
    this.top_connections_input.value = data[0];
    this.right_connections_input.value = data[1];
    this.bottom_connections_input.value = data[2];
    this.left_connections_input.value = data[3];
    this.type_input.value = data[4];

    this.updatePreview();
  }

  resetPreview() {
    this.type_input.value = "n";
    this.top_connections_input.value = 0;
    this.right_connections_input.value = 0;
    this.bottom_connections_input.value = 0;
    this.left_connections_input.value = 0;

    this.updatePreview();
  }

  rotateTile(evt, i, j) {
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

    this.level[i][j] = [+data[0], +data[1], +data[2], +data[3], data[4]];
    const block = this.createBlock(data[4], data[0], data[1], data[2], data[3]);
    tile.appendChild(block);
  }

  dropOnTile(evt, i, j) {
    evt.preventDefault();

    const tile = evt.currentTarget;
    if (tile === this.dragged) return;

    const data = this.dragged.dataset.data.split(";");
    this.level[i][j] = [+data[0], +data[1], +data[2], +data[3], data[4]];

    tile.dataset.data = this.dragged.dataset.data;
    tile.innerHTML = this.dragged.innerHTML;

    if (this.dragged.classList.contains("tile")) {
      this.dragged.dataset.data = "0;0;0;0;n";
      this.dragged.innerHTML = "";

      const tiles = this.container.querySelectorAll(".tile");
      for (let i = 0; i < tile.length; i++) {
        if (tiles[i] === this.dragged) {
          this.level[(i / this.grid_size) | 0][i % this.grid_size] = [0, 0, 0, 0, "n"];
        }
      }
    }
  }

  createBlock(type, top, right, bottom, left) {
    const block = document.createElement("div");
    block.className = `block ${type}`;
    block.style.animation = "none";

    const shadow = document.createElement("div");
    shadow.className = "shadow";
    shadow.style.animation = "none";
    block.appendChild(shadow);

    const mark = document.createElement("div");
    mark.className = "mark";
    mark.style.animation = "none";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    for (let i = 0; i < type.length; i++) {
      // prettier-ignore
      switch (type[i]) {
        case "h": svg.appendChild(document.querySelector(".horizontal-move-mark-template").content.children[0].cloneNode(true)); break;
        case "v": svg.appendChild(document.querySelector(".vertical-move-mark-template").content.children[0].cloneNode(true)); break;
        case "r": svg.appendChild(document.querySelector(".rotate-mark-template").content.children[0].cloneNode(true)); break;
        case "n": svg.appendChild(document.querySelector(".no-move-mark-template").content.children[0].cloneNode(true)); break;
      }
    }

    mark.appendChild(svg);
    block.appendChild(mark);

    const connections_container = document.createElement("div");
    connections_container.className = "connections";

    connections_container.appendChild(this.createConnections("top", top));
    connections_container.appendChild(this.createConnections("right", right));
    connections_container.appendChild(this.createConnections("bottom", bottom));
    connections_container.appendChild(this.createConnections("left", left));

    block.appendChild(connections_container);

    return block;
  }

  createConnections(side, connections) {
    const connections_container = document.createElement("div");
    connections_container.className = side;
    connections_container.style.animation = "none";

    for (let i = 0; i < connections; i++) {
      const connection = document.createElement("div");
      connection.className = "connection";
      connections_container.appendChild(connection);
    }

    return connections_container;
  }
}
