"use strict";

class Editor {
  constructor() {
    this.container = document.querySelector(".editor");

    this.squares_editor = new SquaresEditor();

    this.edit_screens = this.container.querySelectorAll(".edit-screen > div");
    this.modes_buttons = this.container.querySelectorAll(".mode");

    for (let i = 0; i < this.modes_buttons.length; i++) {
      if (this.modes_buttons[i].classList.contains("disabled")) continue;

      this.modes_buttons[i].addEventListener("click", () => {
        for (let j = 0; j < this.modes_buttons.length; j++) this.modes_buttons[j].classList.remove("active");
        this.modes_buttons[i].classList.add("active");

        /* prettier-ignore */
        switch(i) {
          case 0: break;
          case 1: break;
          case 2: break;
          case 3: this.squares_editor.load(); break;
          case 4: break;
          case 5: break;
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

const editor = new Editor();
