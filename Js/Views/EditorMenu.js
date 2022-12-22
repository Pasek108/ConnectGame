"use strict";

class EditorMenu extends View {
  constructor() {
    super(".editor");
    View.addView(this, "editor_menu", `${url}?editor`);

    this.bridges_editor = new BridgesEditor();
    this.pipes_editor = new PipesEditor();
    this.squares_editor = new SquaresEditor();

    this.initModes();
    this.loadEditor(0);
    this.show();
  }

  /**
   * Adds listeners to editor modes buttons
   */
  initModes() {
    this.modes_buttons = this.container.querySelectorAll(".editor-option");

    for (let i = 0; i < this.modes_buttons.length; i++) {
      if (this.modes_buttons[i].classList.contains("disabled")) continue;
      this.modes_buttons[i].addEventListener("click", () => this.loadEditor(i));
    }
  }

  /**
   * Loads editor with specified id
   * @param {number} editor_id 
   */
  loadEditor(editor_id) {
    this.bridges_editor.hide();
    this.pipes_editor.hide();
    this.squares_editor.hide();

    /* prettier-ignore */
    switch(editor_id) {
      case 0: this.bridges_editor.load(); break;
      case 1: this.pipes_editor.load(); break;
      case 2: this.squares_editor.load(); break;
    }
  }

  /**
   * Removes listeners from editor modes buttons
   */
  removeListeners() {
    for (let i = 0; i < this.modes_buttons.length; i++) {
      this.modes_buttons[i].replaceWith(this.modes_buttons[i].cloneNode(true));
    }
  }
}
