"use strict";

class Menu {
  constructor() {
    this.container = document.querySelector(".menu");
    this.options = this.container.querySelectorAll(".option");

    this.addListeners();
  }

  addListeners() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].classList.contains("disabled")) continue;

      this.options[i].addEventListener("click", () => {
        this.hide();

        if (i < 6) {
          page_history.add(this.options[i].dataset.mode, i);
          levels.loadMode(this.options[i].dataset.mode, i);
        } else if (i === 6) {
          page_history.add(this.options[i].dataset.mode, i);
          editor.show();
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
}

class Levels {
  constructor() {
    this.container = document.querySelector(".levels");

    this.mode_name = "";
    this.mode_id = 0;

    this.title = this.container.querySelector(".title");
    this.levels = this.createLevels();
  }

  createLevels() {
    const levels = [];
    const levels_buttons = document.createDocumentFragment();

    for (let i = 0; i < 200; i++) {
      const level_button = document.createElement("div");
      level_button.className = "level";
      level_button.innerText = i + 1;

      if (i === 199) level_button.innerHTML = `<i class="fas fa-question"></i>`;

      levels_buttons.appendChild(level_button);
      levels.push(level_button);
    }

    this.container.appendChild(levels_buttons);

    return levels;
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
  }

  loadMode(mode_name, mode_id) {
    this.mode_name = mode_name;
    this.mode_id = mode_id;

    const completed_levels = modes_info[this.mode_name].completed_levels;
    const title = modes_info[this.mode_name][document.body.lang];
    this.title.innerText = title;

    // recreate levels
    for (let i = 0; i < this.levels.length; i++) this.levels[i].remove();
    this.levels = this.createLevels();

    // add listeners to levels
    for (let i = 0; i < this.levels.length; i++) {
      if (i < completed_levels) this.levels[i].classList.add("complete");
      else if (i > completed_levels) this.levels[i].classList.add("disabled");

      if (i <= completed_levels) {
        this.levels[i].addEventListener("click", () => {
          page_history.add(this.mode_name, this.mode_id, i + 1);
          this.hide();

          game.loadGame(this.mode_name, this.mode_id, i);
        });
      }
    }

    this.show();
  }
}

const menu = new Menu();
const levels = new Levels();
