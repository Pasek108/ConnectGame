"use strict";

class Levels extends View {
  constructor(mode_name) {
    super(".levels");

    View.addView(this, "levels", `${url}?${mode_name}`);
    this.mode_name = mode_name;
    this.container.innerHTML = "";

    this.initLevels();
  }

  /**
   * Creates levels buttons and adds listeners to them
   */
  initLevels() {
    const title = document.querySelector(`.option[data-mode="${this.mode_name}"] .${document.body.lang}`).innerText;
    const title_element = GlobalUtils.createNewDOM("div", "title", title);
    this.container.appendChild(title_element);

    let completed_levels = JSON.parse(localStorage.getItem("completed_levels"));
    const levels_buttons = document.createDocumentFragment();

    for (let i = 0; i < 200; i++) {
      const level_button = GlobalUtils.createNewDOM("button", "levels-option option", `${i + 1}`);
      if (i === 199) level_button.innerHTML = `<i class="fas fa-question"></i>`;

      if (i <= completed_levels[this.mode_name]) level_button.addEventListener("click", () => this.openLevel(i));
      if (i < completed_levels[this.mode_name]) level_button.classList.add("complete");
      if (i > completed_levels[this.mode_name]) level_button.classList.add("disabled");
      
      levels_buttons.appendChild(level_button);
    }

    this.container.appendChild(levels_buttons);
  }

  /**
   * Creates game
   */
  openLevel(level_id) {
    this.hide();
    this.removeGameListeners();
    this.game = new Game(this.mode_name, level_id);
  }

  removeGameListeners() {
    if (this.game != null) this.game.removeListeners();
  }
}
