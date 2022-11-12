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

    this.next = this.container.querySelector(".next");
    this.next.addEventListener("click", () => {
      if (this.data.level >= 199) return;
      this.loadGame(this.data.mode, this.data.id, this.data.level + 1);
    });

    this.reset = this.container.querySelector(".reset");
    this.reset.addEventListener("click", this.resetLevel.bind(this));

    this.size = this.container.querySelector(".tile-size");
    this.size.addEventListener("input", this.changeSize.bind(this));
    this.size.value = 6;

    this.rules = this.container.querySelector(".rules");
    this.rules_modes = this.rules.querySelectorAll(".wrapper > div");

    this.rules_button = this.container.querySelector(".rules-button");
    this.rules_button.addEventListener("click", () => this.rules.classList.remove("hidden"));

    this.rules_close_button = this.container.querySelector(".close");
    this.rules_close_button.addEventListener("click", () => this.rules.classList.add("hidden"));
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

    const completed_levels = modes_info[mode_name].completed_levels;
    const title = modes_info[mode_name][document.body.lang];

    this.rules.classList.add("hidden");
    for (let i = 0; i < this.rules_modes.length; i++) this.rules_modes[i].classList.add("hidden");

    this.rules_modes[mode_id].classList.remove("hidden");

    this.title.innerHTML = `<span>${title.split(" ")[0]}</span>${level_id + 1} / 200`;

    if (level_id === 0) this.prev.classList.add("disabled");
    else this.prev.classList.remove("disabled");

    if (level_id === 199 || completed_levels <= level_id) this.next.classList.add("disabled");
    else this.next.classList.remove("disabled");

    this.grid.innerHTML = "";

    // prettier-ignore
    switch (mode_id) {
      case 0: this.game = new BridgesGrid(this.size.value, bridges_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      case 1: this.game = new PipesGrid(this.size.value, pipes_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      case 2: this.game = new SlidersGrid(this.size.value, sliders_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      case 3: this.game = new SquaresGrid(this.size.value, easy_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      case 4: this.game = new SquaresGrid(this.size.value, normal_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      case 5: this.game = new SquaresGrid(this.size.value, hard_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
    }

    this.show();
  }

  changeSize() {
    this.game.setGridSize(this.size.value);
  }

  resetLevel() {
    this.loadGame(this.data.mode, this.data.id, this.data.level);
  }

  unlockNextLevel(mode, mode_id, level_id) {
    if (level_id < 200) {
      this.next.classList.remove("disabled");

      switch (mode_id) {
        case 1:
          if (mode === "lines") {
            if (level_id === completed_levels.bridges) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.bridges++;
            }
          } else if (mode === "squares") {
            if (level_id === completed_levels.easy) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.easy++;
            }
          }
          break;
        case 2:
          if (mode === "lines") {
            if (level_id === completed_levels.pipes) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.pipes++;
            }
          } else if (mode === "squares") {
            if (level_id === completed_levels.normal) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.normal++;
            }
          }
          break;
        case 3:
          if (mode === "lines") {
            if (level_id === completed_levels.sliders) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.sliders++;
            }
          } else if (mode === "squares") {
            if (level_id === completed_levels.hard) {
              modes_info[mode][mode_id - 1].completed_levels++;
              completed_levels.hard++;
            }
          }
          break;
      }

      localStorage.setItem("completed_levels", JSON.stringify(completed_levels));
    }
  }
}

const game = new Game();
