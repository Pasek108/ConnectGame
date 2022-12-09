"use strict";

class Menu extends View {
  constructor() {
    super(".menu");
    View.addView(this, "menu", url);
    
    this.initOptions();
  }

  /**
   * Adds listeners to menu options
   */
  initOptions() {
    this.options = this.container.querySelectorAll(".menu-option");

    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].classList.contains("disabled")) continue;
      this.options[i].addEventListener("click", () => this.openOption(i));
    }
  }

  /**
   * Creates levels or editor menu
   * @param {number} option_id 
   */
  openOption(option_id) {
    this.hide();

    if (option_id < 6) {
      if (this.levels != null) this.levels.removeListeners();
      this.levels = new Levels(this.options[option_id].dataset.mode);
      this.levels.show();
    } else if (option_id === 6) {
      if (this.editor_menu != null) this.editor_menu.removeListeners();
      this.editor_menu = new EditorMenu();
      this.editor_menu.show();
    }
  }
}
