"use strict";

class SlidersGrid {
  constructor(level, unlockNextLevel) {
    this.unlockNextLevel = unlockNextLevel;
    this.height = level.length;
    this.width = level[0].length;
    this.level = this.copyLevel(level);
    //for (let i = 0; i < 100; i++) this.shuffleLevel();

    this.container = document.querySelector(".grid");
    this.container.className = "grid pipes";
    this.container.innerHTML = "";
    this.container.style.width = `${(this.width + 2) * 6 + (this.width + 2 - 1) * 0.1}rem`;
    this.container.style.height = `${(this.height + 2) * 6 + (this.height + 2 - 1) * 0.1}rem`;
    this.container.style.gridTemplateColumns = `repeat(${this.width + 2}, 6rem)`;
    this.container.style.gridTemplateRows = `repeat(${this.height + 2}, 6rem)`;

    this.controls = [];
    this.tiles = [];
    const mid = ((this.height + 2) / 2) | 0;

    for (let i = 0; i < this.height + 2; i++) {
      this.tiles.push([]);

      for (let j = 0; j < this.width + 2; j++) {
        const control_tile = document.createElement("div");
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

        this.tiles[i - 1].push(new SlidersTile(this.level[i - 1][j - 1]));
        this.container.appendChild(this.tiles[i - 1][j - 1].container);
      }
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(this.isConnectedToSource(i, j, visited_tiles));
        }
      }
    }
  }

  copyLevel(level) {
    const level_copy = [];

    for (let i = 0; i < this.height; i++) {
      level_copy.push([]);

      for (let j = 0; j < this.width; j++) {
        level_copy[i].push([...level[i][j]]);
      }
    }

    return level_copy;
  }

  shuffleLevel() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {}
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

  checkCorrectConnections(x, y) {
    let correct_connections = [];

    const current_block = this.level[x][y];
    const adjacent_blocks = [
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
      [false, false, false, false, "c"],
    ];

    if (x - 1 >= 0) adjacent_blocks[0] = this.level[x - 1][y];
    if (x + 1 < this.width) adjacent_blocks[2] = this.level[x + 1][y];

    if (y - 1 >= 0) adjacent_blocks[3] = this.level[x][y - 1];
    if (y + 1 < this.height) adjacent_blocks[1] = this.level[x][y + 1];

    for (let i = 0; i < 4; i++) {
      correct_connections.push(current_block[i] == adjacent_blocks[i][(i + 2) % 4]);
    }

    return correct_connections;
  }

  checkAllConnections() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const connections = this.checkCorrectConnections(i, j);

        for (let k = 0; k < 4; k++) {
          if (!connections[k]) return false;
        }
      }
    }

    return true;
  }

  isConnectedToSource(y, x, visited_tiles) {
    if (this.level[y][x][4] === "s") return true;

    const connections = this.checkCorrectConnections(y, x);
    const adjacent_tiles_indexes = [
      { y: y - 1, x: x },
      { y: y, x: x + 1 },
      { y: y + 1, x: x },
      { y: y, x: x - 1 },
    ];

    for (let k = 0; k < 4; k++) {
      const p = adjacent_tiles_indexes[k].y;
      const q = adjacent_tiles_indexes[k].x;

      if (p >= 0 && p < this.height && q >= 0 && q < this.width) {
        if (connections[k] && this.level[p][q][(k + 2) % 4]) {
          if (visited_tiles.includes(`${p}${q}`)) continue;
          visited_tiles.push(`${p}${q}`);

          if (this.isConnectedToSource(p, q, visited_tiles)) return true;
        }
      }
    }

    return false;
  }

  tileClicked() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.level[i][j][4] === "d") {
          const visited_tiles = [`${i}${j}`];
          this.tiles[i][j].setConnected(this.isConnectedToSource(i, j, visited_tiles));
        }
      }
    }

    if (this.checkAllConnections()) this.win();
  }

  win() {
    for (let i = 0; i < this.controls.length; i++) {
      this.controls[i].parentNode.replaceChild(this.controls[i].cloneNode(true), this.controls[i]);
    }

    setTimeout(fireConfetti, 100);
    this.unlockNextLevel();
  }
}
