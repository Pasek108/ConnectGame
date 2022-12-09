"use strict";

class SquaresEditor extends Editor {
  constructor() {
    super("squares");
    this.dragged = null;
    this.level = [];

    // preview inputs
    this.type_input = this.container.querySelector(".type select");
    this.type_input.addEventListener("input", this.updatePreview.bind(this));

    this.top_connections_input = this.container.querySelector(".top input");
    this.top_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.right_connections_input = this.container.querySelector(".right input");
    this.right_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.bottom_connections_input = this.container.querySelector(".bottom input");
    this.bottom_connections_input.addEventListener("input", this.updatePreview.bind(this));

    this.left_connections_input = this.container.querySelector(".left input");
    this.left_connections_input.addEventListener("input", this.updatePreview.bind(this));

    for (let i = 0; i < this.previews.length; i++) {
      this.previews[i].addEventListener("dragover", (evt) => evt.preventDefault());
      this.previews[i].addEventListener("drop", this.dropOnPreview.bind(this));
      this.previews[i].addEventListener("click", this.rotatePreviewBlock.bind(this));
    }
  }

  load() {
    super.load();
    this.resetPreview();
  }

  generateLevel() {
    this.level = SquaresUtils.generateNewLevel(this.grid_size, this.grid_size);

    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        if (this.level[i][j].reduce((prev, next) => prev + next) === "0n") {
          this.tiles[i][j].dataset.data = "0;0;0;0;n";
          this.tiles[i][j].innerHTML = "";
          continue;
        }

        const block = SquaresUtils.createBlock(this.level[i][j], [0, 0, 0, 0], true);
        this.tiles[i][j].dataset.data = this.level[i][j].join(";");
        this.tiles[i][j].innerHTML = "";
        this.tiles[i][j].appendChild(block);
      }
    }
  }

  updatePreview() {
    const type = this.type_input.value;
    const top = this.top_connections_input.value;
    const right = this.right_connections_input.value;
    const bottom = this.bottom_connections_input.value;
    const left = this.left_connections_input.value;

    this.previews[0].innerHTML = "";
    this.previews[0].dataset.data = `${top};${right};${bottom};${left};${type}`;

    if (top == 0 && right == 0 && bottom == 0 && left == 0) return;

    const block = SquaresUtils.createBlock([top, right, bottom, left, type], [0, 0, 0, 0], true);
    this.previews[0].appendChild(block);
  }

  rotatePreviewBlock() {
    const temp = this.top_connections_input.value;
    this.top_connections_input.value = this.left_connections_input.value;
    this.left_connections_input.value = this.bottom_connections_input.value;
    this.bottom_connections_input.value = this.right_connections_input.value;
    this.right_connections_input.value = temp;

    this.updatePreview();
  }

  dropOnPreview(evt) {
    evt.preventDefault();

    const data = this.dragged.dataset.data.split(";");
    this.top_connections_input.value = data[0];
    this.right_connections_input.value = data[1];
    this.bottom_connections_input.value = data[2];
    this.left_connections_input.value = data[3];
    this.type_input.value = data[4];

    this.updatePreview();
  }

  resetPreview() {
    this.type_input.value = "n";
    this.top_connections_input.value = 0;
    this.right_connections_input.value = 0;
    this.bottom_connections_input.value = 0;
    this.left_connections_input.value = 0;

    this.updatePreview();
  }
}
