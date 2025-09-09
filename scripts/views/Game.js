"use strict";

class Game extends View {
  constructor(mode_name, level) {
    super(".game");

    View.addView(this, "game", `${url}?${mode_name}-${level + 1}`);
    this.mode_name = mode_name;
    this.level = level;

    this.rules = new Rules(mode_name);

    this.title = this.container.querySelector(".title");
    this.grid = this.container.querySelector(".grid");

    this.prev = this.container.querySelector(".prev");
    this.prev.addEventListener("click", this.openPreviousLevel.bind(this));

    this.next = this.container.querySelector(".next");
    this.next.addEventListener("click", this.openNextLevel.bind(this));

    this.reset = this.container.querySelector(".reset");
    this.reset.addEventListener("click", this.resetLevel.bind(this));

    this.size = this.container.querySelector(".tile-size");
    this.size.addEventListener("input", this.changeSize.bind(this));
    this.size.value = 6;

    this.loadGame(this.mode_name, this.level);
  }

  openPreviousLevel() {
    if (this.level < 1) return;
    this.level -= 1;
    this.loadGame(this.mode_name, this.level);
  }

  openNextLevel() {
    if (this.level >= 199) return;
    this.level += 1;
    this.loadGame(this.mode_name, this.level);
  }

  loadGame(mode_name, level) {
    let completed_levels = JSON.parse(localStorage.getItem("completed_levels"));

    this.prev.classList.remove("disabled");
    this.next.classList.remove("disabled");

    if (level === 0) this.prev.classList.add("disabled");
    if (level === 199 || level >= completed_levels[this.mode_name]) this.next.classList.add("disabled");

    const title = document.querySelector(`.option[data-mode="${mode_name}"] .${document.body.lang}`).innerText;
    this.title.innerHTML = `<span>${title}</span>${level + 1} / 200`;
    this.grid.innerHTML = "";

    // prettier-ignore
    switch (mode_name) {
      case "bridges": this.game = new BridgesGrid(this.size.value, bridges_levels[level], this.unlockNextLevel.bind(this)); break;
      case "pipes": this.game = new PipesGrid(this.size.value, pipes_levels[level], this.unlockNextLevel.bind(this)); break;
      case "sliders": this.game = new SlidersGrid(this.size.value, pipes_levels[level], this.unlockNextLevel.bind(this)); break;
      case "easy": this.game = new SquaresGrid(this.size.value, easy_levels[level], this.unlockNextLevel.bind(this)); break;
      case "normal": this.game = new SquaresGrid(this.size.value, normal_levels[level], this.unlockNextLevel.bind(this)); break;
      case "hard": this.game = new SquaresGrid(this.size.value, hard_levels[level], this.unlockNextLevel.bind(this)); break;
    }

    this.show();
  }

  changeSize() {
    this.game.setGridSize(this.size.value);
  }

  resetLevel() {
    this.loadGame(this.mode_name, this.level);
  }

  unlockNextLevel() {
    setTimeout(this.fireConfetti.bind(this), 100);

    let completed_levels = JSON.parse(localStorage.getItem("completed_levels"));
    
    if (this.level < 200 && this.level !== completed_levels[this.mode_name]) return;

    this.next.classList.remove("disabled");
    completed_levels[this.mode_name]++;
    localStorage.setItem("completed_levels", JSON.stringify(completed_levels));
  }

  fireConfetti() {
    const confetti_positions = [
      { origin: { x: 0.1, y: 1 }, angle: 60 },
      { origin: { x: 0.9, y: 1 }, angle: 120 },
    ];

    const confetti_options = [
      { particleRatio: Math.floor(200 * 0.25), spread: 26, startVelocity: 55 },
      { particleRatio: Math.floor(200 * 0.2), spread: 60 },
      { particleRatio: Math.floor(200 * 0.35), spread: 100, decay: 0.91, scalar: 0.8 },
      { particleRatio: Math.floor(200 * 0.1), spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
      { particleRatio: Math.floor(200 * 0.1), spread: 120, startVelocity: 45 },
    ];

    for (let i = 0; i < confetti_positions.length; i++) {
      for (let j = 0; j < confetti_options.length; j++) {
        confetti(Object.assign({}, confetti_positions[i], confetti_options[j]));
      }
    }
  }

  removeListeners() {
    this.prev.replaceWith(this.prev.cloneNode(true));
    this.next.replaceWith(this.next.cloneNode(true));
    this.reset.replaceWith(this.reset.cloneNode(true));
    this.size.replaceWith(this.size.cloneNode(true));
  }
}
