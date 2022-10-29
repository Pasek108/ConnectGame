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

    const completed_levels = modes_info[mode_name][mode_id - 1].completed_levels;
    const title = modes_info[mode_name][mode_id - 1][document.body.lang];

    this.rules.classList.add("hidden");
    for (let i = 0; i < this.rules_modes.length; i++) this.rules_modes[i].classList.add("hidden");

    if (mode_name === "lines") this.rules_modes[mode_id - 1].classList.remove("hidden");
    else if (mode_name === "squares") this.rules_modes[mode_id + 2].classList.remove("hidden");

    this.title.innerHTML = `<span>${title.split(" ")[0]}</span>${level_id + 1} / 200`;

    if (level_id === 0) this.prev.classList.add("disabled");
    else this.prev.classList.remove("disabled");

    if (level_id === 199 || completed_levels <= level_id) this.next.classList.add("disabled");
    else this.next.classList.remove("disabled");

    this.grid.innerHTML = "";

    if (mode_name === "lines") {
      // prettier-ignore
      switch (mode_id) {
        case 1: new BridgesGrid(bridges_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
        case 2: new PipesGrid(pipes_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
        case 3: new SlidersGrid(sliders_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      }
    } else if (mode_name === "squares") {
      // prettier-ignore
      switch (mode_id) {
        case 1: new SquaresGrid(easy_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
        case 2: new SquaresGrid(normal_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
        case 3: new SquaresGrid(hard_levels[level_id], () => this.unlockNextLevel(mode_name, mode_id, level_id)); break;
      }
    }

    this.show();
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
