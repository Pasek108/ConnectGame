"use strict";

class Game {
  constructor() {
    this.container = document.querySelector(".game");
    this.title = this.container.querySelector(".title");
    this.grid = this.container.querySelector(".grid");

    this.prev = this.container.querySelector(".prev");
    this.prev.addEventListener("click", () => {
      if (this.data.level < 1) return;
      this.loadGame(this.data.mode, this.data.id, this.data.level - 1);
    });

    this.reset = this.container.querySelector(".reset");
    this.reset.addEventListener("click", this.resetLevel.bind(this));

    this.next = this.container.querySelector(".next");
    this.next.addEventListener("click", () => {
      if (this.data.level >= 199) return;
      this.loadGame(this.data.mode, this.data.id, this.data.level + 1);
    });
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
  }

  loadGame(mode_name, mode_id, level_id) {
    if (level_id < 0 || level_id > 199) return;

    this.data = {
      mode: mode_name,
      id: mode_id,
      level: level_id,
    };

    const completed_levels = modes_info[mode_name][mode_id - 1].completed_levels;
    const title = modes_info[mode_name][mode_id - 1][document.body.lang];

    this.title.innerHTML = `<span>${title.split(" ")[0]}</span>${level_id + 1} / 200`;

    if (level_id === 0) this.prev.classList.add("disabled");
    else this.prev.classList.remove("disabled");

    if (level_id === 199 || completed_levels <= level_id) this.next.classList.add("disabled");
    else this.next.classList.remove("disabled");

    this.grid.innerHTML = "";

    if (mode_name === "lines") {
      switch (mode_id) {
        case 1:
          new LinesGrid(bridges_levels[level_id], mode_id, level_id);
          break;
        case 2:
          new LinesGrid(pipes_levels[level_id], mode_id, level_id);
          break;
        case 3:
          new LinesGrid(sliders_levels[level_id], mode_id, level_id);
          break;
      }
    } else if (mode_name === "squares") {
      switch (mode_id) {
        case 1:
          new SquaresGrid(easy_levels[level_id], mode_id, level_id);
          break;
        case 2:
          new SquaresGrid(normal_levels[level_id], mode_id, level_id);
          break;
        case 3:
          new SquaresGrid(hard_levels[level_id], mode_id, level_id);
          break;
      }
    }

    this.show();
  }

  resetLevel() {
    this.loadGame(this.data.mode, this.data.id, this.data.level);
  }
}

const game = new Game();
