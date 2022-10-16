"use strict";

class Editor {
  constructor() {
    this.container = document.querySelector(".editor");

    this.edit_screens = this.container.querySelectorAll(".edit-screen > div");
    this.modes = this.container.querySelectorAll(".mode");

    for (let i = 0; i < this.modes.length; i++) {
      if (this.modes[i].classList.contains("disabled")) continue;

      this.modes[i].addEventListener("click", () => {
        for (let j = 0; j < this.modes.length; j++) this.modes[j].classList.remove("active");
        this.modes[i].classList.add("active");

        /* prettier-ignore */
        switch(i) {
          case 0: this.loadBridges(); break;
          case 1: this.loadPipes(); break;
          case 2: this.loadSliders(); break;
          case 3: this.loadSquares(); break;
          case 4: this.loadHexagons(); break;
          case 5: this.loadTriangles(); break;
        }
      });
    }
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
  }

  loadSquares() {
    for (let i = 0; i < this.edit_screens.length; i++) this.edit_screens[i].classList.remove("active");
    this.edit_screens[3].classList.add("active");

    this.width = 4;
    this.height = 4;

    this.createGrid("squares");
    const size_input = document.querySelector(".squares .size input");
    size_input.value = this.width;
    size_input.addEventListener("input", () => {
      this.width = size_input.value;
      this.height = size_input.value;
      this.createGrid("squares");
    });

    const top_input = document.querySelector(".squares .top input");
    top_input.addEventListener("input", () => {
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });

    const right_input = document.querySelector(".squares .right input");
    right_input.addEventListener("input", () => {
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });

    const bottom_input = document.querySelector(".squares .bottom input");
    bottom_input.addEventListener("input", () => {
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });

    const left_input = document.querySelector(".squares .left input");
    left_input.addEventListener("input", () => {
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });

    this.dragged = null;
    const preview = document.querySelector(".squares .preview");
    preview.dataset.data = "0;0;0;0;n";

    preview.addEventListener("dragstart", () => (this.dragged = preview));
    preview.addEventListener("dragover", (evt) => evt.preventDefault());
    preview.addEventListener("drop", (evt) => {
      evt.preventDefault();
      const data = this.dragged.dataset.data.split(";");

      top_input.value = data[0];
      right_input.value = data[1];
      bottom_input.value = data[2];
      left_input.value = data[3];
      type_input.value = data[4];

      preview.dataset.data = this.dragged.dataset.data;
      preview.innerHTML = this.dragged.innerHTML;
    });

    preview.addEventListener("click", () => {
      const temp = top_input.value;
      top_input.value = left_input.value;
      left_input.value = bottom_input.value;
      bottom_input.value = right_input.value;
      right_input.value = temp;
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });

    const type_input = document.querySelector(".squares .type select");
    type_input.addEventListener("input", () => {
      preview.dataset.data = `${top_input.value};${right_input.value};${bottom_input.value};${left_input.value};${type_input.value}`;
      this.createPreview(preview, type_input.value, top_input.value, right_input.value, bottom_input.value, left_input.value);
    });
  }

  createGrid(type) {
    this.grid = this.container.querySelector(`.${type} .grid`);
    this.grid.className = `grid ${type}`;
    this.grid.innerHTML = "";
    this.grid.style.width = `${this.width * 6 + (this.width - 1) * 0.1}rem`;
    this.grid.style.height = `${this.height * 6 + (this.height - 1) * 0.1}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.width}, 6rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.height}, 6rem)`;

    this.level = [];
    for (let i = 0; i < this.height; i++) {
      this.level.push([]);

      for (let j = 0; j < this.width; j++) {
        this.level[i].push([0, 0, 0, 0, "n"]);

        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.data = "0;0;0;0;n";

        tile.addEventListener("click", () => {
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
          const object = this.createObject(data[4], data[0], data[1], data[2], data[3]);
          tile.appendChild(object);
        });

        tile.draggable = "true";
        tile.addEventListener("dragstart", () => (this.dragged = tile));
        tile.addEventListener("dragover", (evt) => evt.preventDefault());
        tile.addEventListener("drop", (evt) => {
          evt.preventDefault();
          if (tile === this.dragged) return;

          const data = this.dragged.dataset.data.split(";");
          this.level[i][j] = [+data[0], +data[1], +data[2], +data[3], data[4]];

          tile.dataset.data = this.dragged.dataset.data;
          tile.innerHTML = this.dragged.innerHTML;

          if (this.dragged.classList.contains("tile")) {
            this.dragged.dataset.data = "0;0;0;0;n";
            this.dragged.innerHTML = "";

            const tiles = document.querySelectorAll(".edit-screen .squares .tile");
            for (let i = 0; i < tile.length; i++) {
              if (tiles[i] === this.dragged) {
                this.level[(i / this.width) | 0][i % this.width] = [0, 0, 0, 0, "n"];
              }
            }
          }
        });
        this.grid.appendChild(tile);
      }
    }
  }

  createPreview(preview, type, top, right, bottom, left) {
    preview.innerHTML = "";
    if (top == 0 && right == 0 && bottom == 0 && left == 0) return;

    const object = this.createObject(type, top, right, bottom, left);
    preview.appendChild(object);
  }

  createObject(type, top, right, bottom, left) {
    const object = document.createElement("div");
    object.className = `object ${type}`;
    object.style.animation = "none";

    const shadow = document.createElement("div");
    shadow.className = "shadow";
    shadow.style.animation = "none";
    object.appendChild(shadow);

    const mark = document.createElement("div");
    mark.className = "mark";
    mark.style.animation = "none";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    for (let i = 0; i < type.length; i++) {
      switch (type[i]) {
        case "h":
          svg.appendChild(document.querySelector(".horizontal-move-mark-template").content.children[0].cloneNode(true));
          break;
        case "v":
          svg.appendChild(document.querySelector(".vertical-move-mark-template").content.children[0].cloneNode(true));
          break;
        case "r":
          svg.appendChild(document.querySelector(".rotate-mark-template").content.children[0].cloneNode(true));
          break;
        case "n":
          svg.appendChild(document.querySelector(".no-move-mark-template").content.children[0].cloneNode(true));
          break;
      }
    }

    mark.appendChild(svg);
    object.appendChild(mark);

    const connections_container = document.createElement("div");
    connections_container.className = "connections";

    connections_container.appendChild(this.createConnections("top", top));
    connections_container.appendChild(this.createConnections("right", right));
    connections_container.appendChild(this.createConnections("bottom", bottom));
    connections_container.appendChild(this.createConnections("left", left));

    object.appendChild(connections_container);

    return object;
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

const editor = new Editor();
