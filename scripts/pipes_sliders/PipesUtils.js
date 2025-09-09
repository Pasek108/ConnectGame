"use strict";

class PipesUtils {
  /* ----------------- templates ----------------- */
  static top_connection_template = document.querySelector(".top-connection-template").content.children[0];
  static right_connection_template = document.querySelector(".right-connection-template").content.children[0];
  static bottom_connection_template = document.querySelector(".bottom-connection-template").content.children[0];
  static left_connection_template = document.querySelector(".left-connection-template").content.children[0];
  static source_template = document.querySelector(".source-template").content.children[0];
  static destination_template = document.querySelector(".destination-template").content.children[0];

  constructor() {}

  static makeCorrections(level) {
    const height = level.length;
    const width = level[0].length;

    let destinations_counter = 0;
    
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (level[i][j][4] == "d") destinations_counter++;
      }
    }

    return (destinations_counter < height);
  }

  static decodeLevel(level) {
    const height = level.length;
    const width = level[0].length;

    const level_copy = GlobalUtils.copyArray(level);
    const multipliers = [8, 4, 2, 1];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let connections = [0, 0, 0, 0, level[i][j][1]];

        while(level_copy[i][j][0] > 0) {
          for (let k = 0; k < 4; k++) {
            if (level_copy[i][j][0] - multipliers[k] >= 0) {
              level_copy[i][j][0] -= multipliers[k];
              connections[k]++;
              break;
            }
          }
        }

        level_copy[i][j] = connections;
      }
    }

    return level_copy;
  }

  static encodeLevel(level) {
    const height = level.length;
    const width = level[0].length;

    const multipliers = [8, 4, 2, 1];
    const level_copy = GlobalUtils.copyArray(level);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let connections = [0, level[i][j][4]];
        for (let k = 0; k < 4; k++) connections[0] += level[i][j][k] * multipliers[k];

        level_copy[i][j] = connections;
      }
    }

    return level_copy;
  }

  /**
   * Creates block for Pipes mode
   * @param {[number, number, number, number, string]} connections array of connections [ top, right, bottom, left, type ] 1, 2, 4, 8
   * @param {boolean} animations_off 
   * @returns {HTMLElement}
   */
  static createBlock(connections, animations_off = false) {
    const type = connections[4];

    const block = GlobalUtils.createNewDOM("div", "block");
    const mark = GlobalUtils.createNewDOM("div", "mark");

    for (let i = 0; i < 4; i++) {
      if (!connections[i]) continue;

      // prettier-ignore
      switch (i) {
            case 0: mark.appendChild(this.top_connection_template.cloneNode(true)); break;
            case 1: mark.appendChild(this.right_connection_template.cloneNode(true)); break;
            case 2: mark.appendChild(this.bottom_connection_template.cloneNode(true)); break;
            case 3: mark.appendChild(this.left_connection_template.cloneNode(true)); break;
          }
    }

    if (type === "s") mark.appendChild(this.source_template.cloneNode(true));
    else if (type === "d") mark.appendChild(this.destination_template.cloneNode(true));

    block.appendChild(mark);

    if (animations_off) {
      block.style.animation = "none";
      mark.style.animation = "none";
    } else {
      setTimeout(() => {
        block.style.animation = "none";
        mark.style.animation = "none";
      }, 500);
    }

    return block;
  }

  /**
   * Creates "empty" level array for Pipes mode
   * @param {number} width 
   * @param {number} height 
   * @returns {[number, number, number, number, string][][]}
   */
  static createEmptyLevelArray(width, height) {
    const new_level = [];

    for (let i = 0; i < height; i++) {
      new_level.push([]);
      for (let j = 0; j < width; j++) new_level[i].push([0, 0, 0, 0, "c"]);
    }

    return new_level;
  }

  /**
   * Creates 
   * @param {number} width 
   * @param {number} height 
   * @returns {[number, number, number, number, string][][]}
   */
  static generateNewLevel(width, height) {
    let new_level = this.createEmptyLevelArray(width, height);

    let pos = [(height / 2) | 0, (width / 2) | 0];
    new_level[pos[0]][pos[1]] = [0, 0, 0, 0, "s"];

    for (let i = 0; i < width * height; i++) {
      const side = GlobalUtils.randomInt(0, 3);

      const step = [-1, 1, 1, -1];
      const max = [height, width];

      if (pos[side % 2] + step[side] < 0) pos[side % 2] += 1;
      if (pos[side % 2] + step[side] >= max[side % 2]) pos[side % 2] -= 1;

      new_level[pos[0]][pos[1]][side] = 1;
      pos[side % 2] += step[side];
      new_level[pos[0]][pos[1]][(side + 2) % 4] = 1;
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const connections_amount = new_level[i][j].reduce((prev, next, id) => prev + (id < 4 ? next : 0));
        const type = new_level[i][j][4];

        if (connections_amount === 1 && type !== "s") new_level[i][j][4] = "d";
      }
    }

    if (this.makeCorrections(new_level)) new_level = this.generateNewLevel(width, height);
    return new_level;
  }

  static checkCorrectConnections(y, x, level) {
    let correct_connections = [];

    const current_block = level[y][x];
    const adjacent_blocks = [
      [0, 0, 0, 0, "c"],
      [0, 0, 0, 0, "c"],
      [0, 0, 0, 0, "c"],
      [0, 0, 0, 0, "c"],
    ];

    if (y - 1 >= 0) adjacent_blocks[0] = level[y - 1][x];
    if (y + 1 < level[0].length) adjacent_blocks[2] = level[y + 1][x];

    if (x - 1 >= 0) adjacent_blocks[3] = level[y][x - 1];
    if (x + 1 < level.length) adjacent_blocks[1] = level[y][x + 1];

    for (let i = 0; i < 4; i++) {
      correct_connections.push(current_block[i] == adjacent_blocks[i][(i + 2) % 4]);
    }

    return correct_connections;
  }

  static checkAllConnections(level) {
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level[0].length; j++) {
        const connections = this.checkCorrectConnections(i, j, level);

        for (let k = 0; k < 4; k++) {
          if (!connections[k]) return false;
        }
      }
    }

    return true;
  }

  static isConnectedToSource(y, x, level, visited_tiles) {
    if (level[y][x][4] === "s") return true;

    const connections = this.checkCorrectConnections(y, x, level);
    const step = [-1, 0, 1, 0];

    for (let k = 0; k < 4; k++) {
      const p = y + step[k];
      const q = x + step[(k + 1) % 4];
      if (p < 0 || p >= level.length || q < 0 || q >= level[0].length) continue;

      if (connections[k] && level[p][q][(k + 2) % 4]) {
        if (visited_tiles.includes(`${p}${q}`)) continue;
        visited_tiles.push(`${p}${q}`);

        if (this.isConnectedToSource(p, q, level, visited_tiles)) return true;
      }
    }

    return false;
  }
}
