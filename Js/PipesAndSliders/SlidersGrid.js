"use strict";

class SlidersGrid {
  constructor(tile_size, level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = GlobalUtils.copyArray(PipesUtils.decodeLevel(level));
    for (let i = 0; i < 100; i++) this.shuffleLevel();

    this.container = document.querySelector(".grid");
    this.container.innerHTML = "";
    this.setGridSize(tile_size);

    this.controls = [];
    this.tiles = [];
    const mid = ((this.height + 2) / 2) | 0;

    for (let i = 0; i < this.height + 2; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width + 2; j++) {
        const control_tile = GlobalUtils.createNewDOM("div");
        let is_control_tile = false;

        if (
          ((i === 0 || i === this.height + 1) && (j === 0 || j === this.width + 1)) ||
          ((i === 0 || i === this.height + 1) && j === mid) ||
          ((j === 0 || j === this.width + 1) && i === mid)
        ) {
          control_tile.className = "empty";
          this.container.appendChild(control_tile);
          continue;
        }

        if (i === 0) {
          control_tile.className = "control up";
          control_tile.addEventListener("click", () => this.moveColumnTop(j - 1));
          is_control_tile = true;
        } else if (j === 0) {
          control_tile.className = "control left";
          control_tile.addEventListener("click", () => this.moveRowLeft(i - 1));
          is_control_tile = true;
        } else if (i === this.height + 1) {
          control_tile.className = "control down";
          control_tile.addEventListener("click", () => this.moveColumnBottom(j - 1));
          is_control_tile = true;
        } else if (j === this.width + 1) {
          control_tile.className = "control right";
          control_tile.addEventListener("click", () => this.moveRowRight(i - 1));
          is_control_tile = true;
        }

        if (is_control_tile) {
          this.container.appendChild(control_tile);
          this.controls.push(control_tile);
          continue;
        }

        this.tiles[i - 1].push(new PipesTile(this.level[i - 1][j - 1]));
        this.container.appendChild(this.tiles[i - 1][j - 1].container);
      }
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(PipesUtils.isConnectedToSource(i, j, this.level, visited_tiles));
        }
      }
    }
  }

  setGridSize(size) {
    this.container.className = `grid pipes size-${size}`;
    this.container.style.width = `${(this.width + 2) * size + (this.width + 2 - 1) * 0.1}rem`;
    this.container.style.height = `${(this.height + 2) * size + (this.height + 2 - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width + 2}, ${size}rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height + 2}, ${size}rem)`;
  }

  shuffleLevel() {
    const row_or_column = GlobalUtils.randomInt(0, 1); // 0 - row, 1 - column
    const side = GlobalUtils.randomInt(0, 1); // 0 - left, top, 1 - right, bottom
    const row_or_column_id = GlobalUtils.randomInt(0, this.width - 1);
    const shift = GlobalUtils.randomInt(1, this.width - 1);

    const center = (this.width / 2) | 0;
    if (+row_or_column_id == +center) return;

    if (row_or_column === 1 && side === 1) this.shiftLevelColumnToBottom(row_or_column_id, shift);
    else if (row_or_column === 1 && side === 0) this.shiftLevelColumnToTop(row_or_column_id, shift);
    else if (row_or_column === 0 && side === 1) this.shiftLevelRowToRight(row_or_column_id, shift);
    else if (row_or_column === 0 && side === 0) this.shiftLevelRowToLeft(row_or_column_id, shift);
  }

  shiftLevelColumnToBottom(column_id, shift) {
    for (let k = 0; k < shift; k++) {
      let temp_level = this.level[this.height - 1][column_id];

      for (let i = this.height - 1; i > 0; i--) {
        this.level[i][column_id] = this.level[i - 1][column_id];
      }

      this.level[0][column_id] = temp_level;
    }
  }

  shiftLevelColumnToTop(column_id, shift) {
    for (let k = 0; k < shift; k++) {
      let temp_level = this.level[0][column_id];

      for (let i = 0; i < this.height - 1; i++) {
        this.level[i][column_id] = this.level[i + 1][column_id];
      }

      this.level[this.height - 1][column_id] = temp_level;
    }
  }

  shiftLevelRowToRight(row_id, shift) {
    for (let k = 0; k < shift; k++) {
      let temp_level = this.level[row_id][this.width - 1];

      for (let j = this.width - 1; j > 0; j--) {
        this.level[row_id][j] = this.level[row_id][j - 1];
      }

      this.level[row_id][0] = temp_level;
    }
  }

  shiftLevelRowToLeft(row_id, shift) {
    for (let k = 0; k < shift; k++) {
      let temp_level = this.level[row_id][0];

      for (let j = 0; j < this.width - 1; j++) {
        this.level[row_id][j] = this.level[row_id][j + 1];
      }

      this.level[row_id][this.width - 1] = temp_level;
    }
  }

  moveRowLeft(i) {
    let temp_tile = this.tiles[i][0];
    let temp_level = this.level[i][0];

    this.container.insertBefore(this.tiles[i][0].container, this.tiles[i][this.width - 1].container);
    this.container.insertBefore(this.tiles[i][this.width - 1].container, this.tiles[i][0].container);

    for (let j = 0; j < this.width - 1; j++) {
      this.tiles[i][j] = this.tiles[i][j + 1];
      this.level[i][j] = this.level[i][j + 1];
    }

    this.tiles[i][this.width - 1] = temp_tile;
    this.level[i][this.width - 1] = temp_level;

    this.tileClicked();
  }

  moveRowRight(i) {
    let temp_tile = this.tiles[i][this.width - 1];
    let temp_level = this.level[i][this.width - 1];

    this.container.insertBefore(this.tiles[i][this.width - 1].container, this.tiles[i][0].container);

    for (let j = this.width - 1; j > 0; j--) {
      this.tiles[i][j] = this.tiles[i][j - 1];
      this.level[i][j] = this.level[i][j - 1];
    }

    this.tiles[i][0] = temp_tile;
    this.level[i][0] = temp_level;

    this.tileClicked();
  }

  swap(node1, node2) {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
  }

  moveColumnTop(j) {
    let temp_tile = this.tiles[0][j];
    let temp_level = this.level[0][j];
    let temp_node = this.tiles[this.height - 1][j].container;

    for (let i = this.height - 1; i > 0; i--) {
      this.swap(this.tiles[i][j].container, this.tiles[i - 1][j].container);
    }

    this.swap(this.tiles[this.height - 1][j].container, temp_node);

    for (let i = 0; i < this.height - 1; i++) {
      this.tiles[i][j] = this.tiles[i + 1][j];
      this.level[i][j] = this.level[i + 1][j];
    }

    this.tiles[this.height - 1][j] = temp_tile;
    this.level[this.height - 1][j] = temp_level;

    this.tileClicked();
  }

  moveColumnBottom(j) {
    let temp_tile = this.tiles[this.height - 1][j];
    let temp_level = this.level[this.height - 1][j];
    let temp_node = this.tiles[0][j].container;

    for (let i = 0; i < this.height - 1; i++) {
      this.swap(this.tiles[i][j].container, this.tiles[i + 1][j].container);
    }

    this.swap(this.tiles[0][j].container, temp_node);

    for (let i = this.height - 1; i > 0; i--) {
      this.tiles[i][j] = this.tiles[i - 1][j];
      this.level[i][j] = this.level[i - 1][j];
    }

    this.tiles[0][j] = temp_tile;
    this.level[0][j] = temp_level;

    this.tileClicked();
  }

  tileClicked() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(PipesUtils.isConnectedToSource(i, j, this.level, visited_tiles));
        }
      }
    }

    if (PipesUtils.checkAllConnections(this.level)) this.win();
  }

  win() {
    for (let i = 0; i < this.controls.length; i++) {
      this.controls[i].parentNode.replaceChild(this.controls[i].cloneNode(true), this.controls[i]);
    }

    this.unlockNextLevel();
  }
}
