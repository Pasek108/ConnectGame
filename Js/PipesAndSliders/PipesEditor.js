"use strict";

class PipesEditor extends Editor {
  constructor() {
    super("pipes");

    // previews
    this.type_input = this.container.querySelector(".type select");
    this.type_input.addEventListener("input", this.changePreviewType.bind(this));

    for (let i = 0; i < this.previews.length; i++) {
      this.previews[i].addEventListener("click", () => this.rotatePreviewBlock(this.previews[i]));
    }
  }

  load() {
    super.load();
    this.resetPreview();
  }

  generateLevel() {
    this.level = PipesUtils.generateNewLevel(this.grid_size, this.grid_size);

    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        const block = PipesUtils.createBlock(this.level[i][j], true);
        this.tiles[i][j].dataset.data = this.level[i][j].join(";");
        this.tiles[i][j].innerHTML = "";
        this.tiles[i][j].appendChild(block);
      }
    }
  }

  changePreviewType() {
    const type = this.type_input.value;

    for (let i = 0; i < this.previews.length; i++) {
      if (type === "c") this.previews[i].style.display = "flex";
      else if (type === "d") {
        this.previews[i].style.display = "none";
        if (i === 1) this.previews[i].style.display = "flex";
      } else if (type === "s") {
        this.previews[i].style.display = "flex";
        if (i === 0) this.previews[i].style.display = "none";
      }

      const data = this.previews[i].dataset.data.split(";");
      data[4] = type;

      this.previews[i].dataset.data = data.join(";");
      this.previews[i].innerHTML = "";

      const block = PipesUtils.createBlock([+data[0], +data[1], +data[2], +data[3], data[4]], true);
      this.previews[i].appendChild(block);
    }
  }

  rotatePreviewBlock(preview) {
    const data = preview.dataset.data.split(";");

    const temp = data[0];
    data[0] = data[3];
    data[3] = data[2];
    data[2] = data[1];
    data[1] = temp;

    preview.dataset.data = data.join(";");
    preview.innerHTML = "";

    const block = PipesUtils.createBlock([+data[0], +data[1], +data[2], +data[3], data[4]], true);
    preview.appendChild(block);
  }

  resetPreview() {
    this.type_input.value = "c";
    this.changePreviewType();
  }
}
