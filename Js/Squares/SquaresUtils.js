"use strict";

class SquaresUtils {
  /* ----------------- templates ----------------- */
  static horizontal_move_mark_template = document.querySelector(".horizontal-move-mark-template").content.children[0];
  static vertical_move_mark_template = document.querySelector(".vertical-move-mark-template").content.children[0];
  static rotate_mark_template = document.querySelector(".rotate-mark-template").content.children[0];
  static no_move_mark_template = document.querySelector(".no-move-mark-template").content.children[0];

  constructor() {}

  static isTileEmpty(tile) {
    let is_empty = true;

    for (let k = 0; k < 4; k++) {
      
      if (tile[k] !== 0) {
        is_empty = false;
        break;
      }
    }

    return is_empty;
  }

  static makeCorrections(level) {
    const height = level.length;
    const width = level[0].length;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (this.isTileEmpty(level[i][j])) continue;

        for (let k = 0; k < 4; k++) {
          if (level[i][j][k] == 0) {
            const y = [-1, 0, 1, 0];
            const x = [0, 1, 0, -1];

            if (i + y[k] < 0 || i + y[k] >= height || j + x[k] < 0 || j + x[k] >= width) continue;
            if (this.isTileEmpty(level[i + y[k]][j + x[k]])) continue;

            if (level[i + y[k]][j + x[k]][(k + 2) % 2] == 0) {
              const new_connection = GlobalUtils.randomInt(1, 4);
              level[i][j][k] = new_connection;
              level[i + y[k]][j + x[k]][(k + 2) % 4] = new_connection;
            }
          }
        }
      }
    }

    return level;
  }

  /**
   * Decodes level saved as [num, type] where is decimal number converted from number in quinary system which is [top, right, bottom, left, type]
   * @param {[number, string][][]} level
   * @returns {[number, number, number, number, string][][]}
   */
  static decodeLevel(level) {
    const height = level.length;
    const width = level[0].length;

    const level_copy = GlobalUtils.copyArray(level);
    const multipliers = [125, 25, 5, 1];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let connections = [0, 0, 0, 0, level[i][j][1]];

        while (level_copy[i][j][0] > 0) {
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

  /**
   * Encodes level saved as [top, right, bottom, left, type] which can be number in quinary system to decimal number [num, type]
   * @param {[number, number, number, number, string][][]} level
   * @returns {[number, string][][]}
   */
  static encodeLevel(level) {
    const height = level.length;
    const width = level[0].length;

    const multipliers = [125, 25, 5, 1];
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
   * Creates "empty" array of squares level for given width and height
   * @param {number} width
   * @param {number} height
   * @returns {[number, number, number, number, string][][]}
   */
  static createEmptyLevelArray(width, height) {
    const new_level = [];

    for (let i = 0; i < height; i++) {
      new_level.push([]);
      for (let j = 0; j < width; j++) new_level[i].push([0, 0, 0, 0, "n"]);
    }

    return new_level;
  }

  /**
   * Generates squares level for given width and height
   * @param {number} width
   * @param {number} height
   * @returns {[number, number, number, number, string][][]}
   */
  static generateNewLevel(width, height) {
    let new_level = this.createEmptyLevelArray(width, height);
    let pos = [GlobalUtils.randomInt(0, height - 1), GlobalUtils.randomInt(0, width - 1)];

    for (let i = 0; i < height * width * 2; i++) {
      const side = GlobalUtils.randomInt(0, 3);
      const type = GlobalUtils.randomInt(0, 7);
      const new_connection = GlobalUtils.randomInt(1, 4);

      const step = [-1, 1, 1, -1];
      const max = [height, width];

      if (pos[side % 2] + step[side] < 0) pos[side % 2] += 1;
      if (pos[side % 2] + step[side] >= max[side % 2]) pos[side % 2] -= 1;

      new_level[pos[0]][pos[1]][side] = new_connection;
      pos[side % 2] += step[side];
      new_level[pos[0]][pos[1]][(side + 2) % 4] = new_connection;

      /* prettier-ignore */
      switch (type) {
        case 0: new_level[pos[0]][pos[1]][4] = "n"; break;
        case 1: new_level[pos[0]][pos[1]][4] = "r"; break;
        case 2: new_level[pos[0]][pos[1]][4] = "h"; break;
        case 3: new_level[pos[0]][pos[1]][4] = "v"; break;
        case 4: new_level[pos[0]][pos[1]][4] = "vr"; break;
        case 5: new_level[pos[0]][pos[1]][4] = "hr"; break;
        case 6: new_level[pos[0]][pos[1]][4] = "vh"; break;
        case 7: new_level[pos[0]][pos[1]][4] = "vhr"; break;
      }
    }

    new_level = this.makeCorrections(new_level);
    return new_level;
  }

  /**
   * Creates block element for given numbers
   * @param {[number, number, number, number, string]} connections
   * @param {[number, number, number, number]} correct_connections
   * @param {boolean} animations_off
   * @returns {HTMLElement}
   */
  static createBlock(connections, correct_connections = [0, 0, 0, 0], animations_off = false) {
    const block = GlobalUtils.createNewDOM("div", `block ${connections[4]}`);

    const shadow = GlobalUtils.createNewDOM("div", "shadow");
    block.appendChild(shadow);

    const mark = GlobalUtils.createNewDOM("div", "mark");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    for (let i = 0; i < connections[4].length; i++) {
      // prettier-ignore
      switch (connections[4][i]) {
        case "h": svg.appendChild(this.horizontal_move_mark_template.cloneNode(true)); break;
        case "v": svg.appendChild(this.vertical_move_mark_template.cloneNode(true)); break;
        case "r": svg.appendChild(this.rotate_mark_template.cloneNode(true)); break;
        case "n": svg.appendChild(this.no_move_mark_template.cloneNode(true)); break;
      }
    }

    mark.appendChild(svg);
    block.appendChild(mark);

    const connections_container = GlobalUtils.createNewDOM("div", "connections");
    connections_container.appendChild(this.createConnections("top", connections[0], correct_connections[0], animations_off));
    connections_container.appendChild(this.createConnections("right", connections[1], correct_connections[1], animations_off));
    connections_container.appendChild(this.createConnections("bottom", connections[2], correct_connections[2], animations_off));
    connections_container.appendChild(this.createConnections("left", connections[3], correct_connections[3], animations_off));

    block.appendChild(connections_container);

    if (animations_off) {
      block.style.animation = "none";
      shadow.style.animation = "none";
      mark.style.animation = "none";
    } else {
      setTimeout(() => {
        block.style.animation = "none";
        shadow.style.animation = "none";
        mark.style.animation = "none";
      }, 2000);
    }

    return block;
  }

  /**
   * Creates connections container for given side and its connections
   * @param {string} side possible values: top, right, bottom, left
   * @param {number} number_of_connections
   * @param {number} is_connection_correct
   * @param {boolean} animations_off
   * @returns {HTMLElement}
   */
  static createConnections(side, number_of_connections, is_connection_correct, animations_off = false) {
    const connections_container = GlobalUtils.createNewDOM("div", side);

    if (animations_off) connections_container.style.animation = "none";
    else setTimeout(() => (connections_container.style.animation = "none"), 2000);

    side = side[0].toUpperCase() + side.slice(1);

    for (let i = 0; i < number_of_connections; i++) {
      const connection = GlobalUtils.createNewDOM("div", "connection");
      connections_container.appendChild(connection);

      if (is_connection_correct) connection.style[`border${side}Width`] = "0px";
    }

    return connections_container;
  }
}
