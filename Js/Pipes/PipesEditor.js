"use strict";

class PipesEditor {
  constructor() {
    this.container = document.querySelector(".edit-screen .pipes");

    // grid input
    this.grid = this.container.querySelector(".grid");
    this.grid_size = 3;
    this.size_input = this.container.querySelector(".size input");
    this.size_input.addEventListener("input", this.changeGridSize.bind(this));

    this.tile_size = this.container.querySelector(".tile-size");
    this.tile_size.addEventListener("input", this.setGridSize.bind(this));
    this.tile_size.value = 6;

    this.generate = this.container.querySelector(".generate");
    this.generate.addEventListener("click", this.generateLevel.bind(this));

    // previews
    this.type_input = this.container.querySelector(".type select");
    this.type_input.addEventListener("input", this.changePreviewType.bind(this));

    this.previews = this.container.querySelectorAll(".preview");
    for (let i = 0; i < this.previews.length; i++) {
      // prettier-ignore
      switch(i) {
        case 0: this.previews[i].dataset.data = "0;0;0;0;c"; break;
        case 1: this.previews[i].dataset.data = "1;0;0;0;c"; break;
        case 2: this.previews[i].dataset.data = "1;1;0;0;c"; break;
        case 3: this.previews[i].dataset.data = "1;0;1;0;c"; break;
        case 4: this.previews[i].dataset.data = "1;1;1;0;c"; break;
        case 5: this.previews[i].dataset.data = "1;1;1;1;c"; break;
      }

      this.previews[i].addEventListener("dragstart", () => (this.dragged = this.previews[i]));

      if (i === 0 || i === 5) continue;
      this.previews[i].addEventListener("click", () => this.rotatePreviewBlock(this.previews[i]));
    }
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
    this.level = generateLinesLevel(this.grid_size, this.grid_size);
    
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        const block = this.createBlock(this.level[i][j][4], [this.level[i][j][0], this.level[i][j][1], this.level[i][j][2], this.level[i][j][3]]);
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
        this.level[i].push([0, 0, 0, 0, "c"]);

        const tile = document.createElement("div");
        tile.className = "tile";
        tile.draggable = "true";
        tile.dataset.data = "0;0;0;0;c";
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
    for (let i = 0; i < this.previews.length; i++) {
      this.previews[i].className = `preview pipes size-${this.tile_size.value}`;
      this.previews[i].style.width = `${this.tile_size.value}rem`;
      this.previews[i].style.height = `${this.tile_size.value}rem`;
    }

    this.grid.className = `grid pipes size-${this.tile_size.value}`;
    this.grid.style.width = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.height = `${this.grid_size * this.tile_size.value + (this.grid_size - 1) * 0.1}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.grid_size}, ${this.tile_size.value}rem)`;
  }

  changePreviewType() {
    const type = this.type_input.value;

    for (let i = 0; i < this.previews.length; i++) {
      if (type === "c") this.previews[i].style.display = "flex";
      else if (type === "d") {
        this.previews[i].style.display = "none";
        if (i === 1) this.previews[i].style.display = "flex";
      } else if (type === "s") {
        this.previews[i].style.display = "flex";
        if (i === 0) this.previews[i].style.display = "none";
      }

      const data = this.previews[i].dataset.data.split(";");
      data[4] = type;

      this.previews[i].dataset.data = data.join(";");
      this.previews[i].innerHTML = "";

      const block = this.createBlock(data[4], [+data[0], +data[1], +data[2], +data[3]]);
      this.previews[i].appendChild(block);
    }
  }

  rotatePreviewBlock(preview) {
    const data = preview.dataset.data.split(";");

    const temp = data[0];
    data[0] = data[3];
    data[3] = data[2];
    data[2] = data[1];
    data[1] = temp;

    preview.dataset.data = data.join(";");
    preview.innerHTML = "";

    const block = this.createBlock(data[4], [+data[0], +data[1], +data[2], +data[3]]);
    preview.appendChild(block);
  }

  resetPreview() {
    this.type_input.value = "c";
    this.changePreviewType();
  }

  rotateTile(evt, i, j) {
    const tile = evt.currentTarget;

    const data = tile.dataset.data.split(";");
    if (!+data[0] && !+data[1] && !+data[2] && !+data[3]) return;

    const temp = data[0];
    data[0] = data[3];
    data[3] = data[2];
    data[2] = data[1];
    data[1] = temp;

    tile.dataset.data = data.join(";");
    tile.innerHTML = "";

    this.level[i][j] = [+data[0], +data[1], +data[2], +data[3], data[4]];
    const block = this.createBlock(data[4], [+data[0], +data[1], +data[2], +data[3]]);
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
      this.dragged.dataset.data = "0;0;0;0;c";
      this.dragged.innerHTML = "";

      const tiles = this.container.querySelectorAll(".tile");
      for (let i = 0; i < tile.length; i++) {
        if (tiles[i] === this.dragged) {
          this.level[(i / this.grid_size) | 0][i % this.grid_size] = [0, 0, 0, 0, "c"];
        }
      }
    }
  }

  createBlock(type, connections_array) {
    this.block = document.createElement("div");
    this.block.className = "block";
    this.block.style.animation = "none";

    this.mark = document.createElement("div");
    this.mark.className = "mark";
    this.mark.style.animation = "none";

    for (let i = 0; i < 4; i++) {
      if (!connections_array[i]) continue;

      // prettier-ignore
      switch (i) {
        case 0: this.mark.appendChild(document.querySelector(".top-connection-template").content.children[0].cloneNode(true)); break;
        case 1: this.mark.appendChild(document.querySelector(".right-connection-template").content.children[0].cloneNode(true)); break;
        case 2: this.mark.appendChild(document.querySelector(".bottom-connection-template").content.children[0].cloneNode(true)); break;
        case 3: this.mark.appendChild(document.querySelector(".left-connection-template").content.children[0].cloneNode(true)); break;
      }
    }

    if (type === "s") this.mark.appendChild(document.querySelector(".source-template").content.children[0].cloneNode(true));
    else if (type === "d") this.mark.appendChild(document.querySelector(".destination-template").content.children[0].cloneNode(true));

    this.block.appendChild(this.mark);

    return this.block;
  }
}
