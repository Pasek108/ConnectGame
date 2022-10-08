"use strict";

class Editor {
  constructor() {
    this.container = document.querySelector(".editor");

    this.modes = this.container.querySelectorAll(".mode");

    for (let i = 0; i < this.modes.length; i++) {
      if (this.modes[i].classList.contains("disabled")) continue;

      this.modes[i].addEventListener("click", () => {
        for (let j = 0; j < this.modes.length; j++) this.modes[j].classList.remove("active");
        this.modes[i].classList.add("active");

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
    this.width = 4;
    this.height = 4;

    this.level = [];
    for (let i = 0; i < this.height + 2; i++) {
      this.level.push([]);
      for (let j = 0; j < this.width + 2; j++) this.level[i].push([0, 0, 0, 0, "n"]);
    }
    
    this.grid = this.container.querySelector(".grid");
    this.grid.className = "grid squares";
    this.grid.innerHTML = "";
    this.grid.style.width = `${this.width * 6 + (this.width - 1) * 0.1}rem`;
    this.grid.style.height = `${this.height * 6 + (this.height - 1) * 0.1}rem`;
    this.grid.style.gridTemplateColumns = `repeat(${this.width}, 6rem)`;
    this.grid.style.gridTemplateRows = `repeat(${this.height}, 6rem)`;

    for (let i = 1; i <= this.height; i++) {
      for (let j = 1; j <= this.width; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        this.grid.appendChild(tile);
      }
    }
  }
}

const editor = new Editor();
