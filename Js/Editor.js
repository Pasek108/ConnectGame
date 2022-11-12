"use strict";

class Editor {
  constructor() {
    this.container = document.querySelector(".editor");

    this.bridges_editor = new BridgesEditor();
    this.pipes_editor = new PipesEditor();
    this.squares_editor = new SquaresEditor();

    this.edit_screens = this.container.querySelectorAll(".edit-screen > div");
    this.modes_buttons = this.container.querySelectorAll(".mode");

    for (let i = 0; i < this.modes_buttons.length; i++) {
      if (this.modes_buttons[i].classList.contains("disabled")) continue;

      this.modes_buttons[i].addEventListener("click", () => {
        for (let j = 0; j < this.modes_buttons.length; j++) this.modes_buttons[j].classList.remove("active");
        this.modes_buttons[i].classList.add("active");

        this.bridges_editor.hide();
        this.pipes_editor.hide();
        this.squares_editor.hide();

        /* prettier-ignore */
        switch(i) {
          case 0: this.bridges_editor.load(); break;
          case 1: this.pipes_editor.load(); break;
          case 2: this.squares_editor.load(); break;
          case 3: break;
          case 4: break;
        }
      });
    }
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
    this.modes_buttons[0].click();
  }
}

const editor = new Editor();
