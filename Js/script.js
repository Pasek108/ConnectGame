"use strict";

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ------------------------ Language ------------------------ */
if (localStorage.getItem("lang") == null) localStorage.setItem("lang", "en");
document.body.lang = localStorage.getItem("lang");

const lang_button = document.querySelector(".lang");
lang_button.addEventListener("click", () => {
  if (document.body.lang === "pl") document.body.lang = "en";
  else document.body.lang = "pl";

  localStorage.setItem("lang", document.body.lang);
});

/* ------------------------ LocalStorage ------------------------ */
if (localStorage.getItem("completed_levels") == null) {
  const completed_levels = {
    bridges: 0,
    pipes: 0,
    sliders: 0,
    easy: 0,
    normal: 0,
    hard: 0,
    hexagons: 0,
    triangles: 0,
  };

  localStorage.setItem("completed_levels", JSON.stringify(completed_levels));
}

let completed_levels = JSON.parse(localStorage.getItem("completed_levels"));

/* ------------------------ Modes info ------------------------ */
const modes_info = {
  bridges: {
    en: "Bridges",
    pl: "Mosty",
    completed_levels: completed_levels.bridges,
  },
  pipes: {
    en: "Pipes",
    pl: "Rury",
    completed_levels: completed_levels.pipes,
  },
  sliders: {
    en: "Sliders",
    pl: "Suwaki",
    completed_levels: completed_levels.sliders,
  },
  easy: {
    en: "Easy",
    pl: "Łatwy",
    completed_levels: completed_levels.easy,
  },
  normal: {
    en: "Normal",
    pl: "Średni",
    completed_levels: completed_levels.normal,
  },
  hard: {
    en: "Hard",
    pl: "Trudny",
    completed_levels: completed_levels.hard,
  },
};

/* ------------------------ History ------------------------ */
class PageHistory {
  constructor() {
    this.url = "http://localhost/Projekty/ConnectGame/index.html";
    this.current_mode = "";
    this.current_id = 0;
    this.current_level = 0;

    //this.add();
    addEventListener("popstate", this.back.bind(this));
  }

  add(mode = "", id = 0, level = 0, replace = false) {
    if (replace) history.replaceState({ mode, id, level }, "", `${this.url}?${mode}${id}-${level}`);
    else history.pushState({ mode, id, level }, "", `${this.url}?${mode}${id}-${level}`);
  }

  back(evt) {
    menu.hide();
    levels.hide();
    game.hide();
    editor.hide();

    if (evt.state == null || evt.state.mode === "") {
      menu.show();
      return;
    }

    if (evt.state.id < 6) levels.loadMode(evt.state.mode, evt.state.id);
    else if (evt.state.id === 6) editor.show();
    else if (evt.state.level > 0 && evt.state.level < 200) game.loadGame(evt.state.mode, evt.state.id, evt.state.level);
  }
}

const page_history = new PageHistory();

/* ------------------------ Bridges level generation ------------------------ */
function getAdjacentIslands(level, connections, width, height, y, x) {
  const adjacent_islands = [null, null, null, null];

  for (let k = y - 1; k >= 0; k--) {
    if (level[k][x] > 0) {
      adjacent_islands[0] = connections[k][x];
      break;
    }
  }

  for (let k = x + 1; k <= width; k++) {
    if (level[y][k] > 0) {
      adjacent_islands[1] = connections[y][k];
      break;
    }
  }

  for (let k = y + 1; k <= height; k++) {
    if (level[k][x] > 0) {
      adjacent_islands[2] = connections[k][x];
      break;
    }
  }

  for (let k = x - 1; k >= 0; k--) {
    if (level[y][k] > 0) {
      adjacent_islands[3] = connections[y][k];
      break;
    }
  }

  return adjacent_islands;
}

function isNewBridgeCrossing(level, connections, width, height, current_island, target_island) {
  let current_island_id = [0, 0];
  let target_island_id = [0, 0];

  for (let i = 0; i <= height; i++) {
    for (let j = 0; j <= width; j++) {
      if (connections[i][j] === current_island) current_island_id = [i, j];
      if (connections[i][j] === target_island) target_island_id = [i, j];
    }
  }

  let start = 0;
  let end = 0;

  if (current_island_id[0] < target_island_id[0] || current_island_id[1] < target_island_id[1]) {
    start = current_island_id;
    end = target_island_id;
  } else {
    start = target_island_id;
    end = current_island_id;
  }

  let axis = +!(start[1] === end[1]);

  for (let i = start[axis] + 1; i < end[axis]; i++) {
    const adjacent = axis === 0 ? getAdjacentIslands(level, connections, width, height, i, start[1]) : getAdjacentIslands(level, connections, width, height, start[0], i);

    for (let j = 0; j < 4; j++) {
      if (adjacent[j] == null) continue;

      if (j === 1 - axis || j === 3 - axis) {
        if (adjacent[j][(j + 2) % 4] !== 0) return true;
      }
    }
  }

  return false;
}

function generateBridgesLevel(width, height) {
  let level = [];
  for (let i = 0; i <= height; i++) {
    level.push([]);
    for (let j = 0; j <= width; j++) level[i].push(0);
  }

  let connections = [];
  for (let i = 0; i <= height; i++) {
    connections.push([]);
    for (let j = 0; j <= width; j++) connections[i].push([0, 0, 0, 0]);
  }

  let current_position = [randomInt(0, height), randomInt(0, width)];

  for (let i = 0; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      const side = randomInt(0, 3);
      const length = side % 2 ? randomInt(1, height - current_position[0] + 1) : randomInt(1, width - current_position[1] + 1);
      let new_position = current_position[side % 2];

      for (let i = 1; i <= length; i++) {
        const step = [-i, i, i, -i];
        const max = [height, width];

        if (current_position[side % 2] + step[side] < 0) {
          new_position = 0;
          break;
        }

        if (current_position[side % 2] + step[side] > max[side % 2]) {
          new_position = max[side % 2];
          break;
        }

        if (level[current_position[0] + step[side] * ((side + 1) % 2)][current_position[1] + step[side] * (side % 2)] > 0) {
          new_position = current_position[side % 2] + step[side];
          break;
        }

        if (i === length) {
          new_position = current_position[side % 2] + step[side];
          break;
        }
      }

      if (new_position !== current_position[side % 2]) {
        const old_position = [current_position[0], current_position[1]];
        const current_island = connections[current_position[0]][current_position[1]];

        if (current_island[side] === 2) continue;
/*
        console.log("--------");
        console.log(current_position[0], current_position[1]);*/

        current_position[side % 2] = new_position;
/*
        console.log(current_position[0], current_position[1]);
        console.log("--------");*/

        const new_island = connections[current_position[0]][current_position[1]];
        let is_crossing = false;

        if (level[current_position[0]][current_position[1]] === 0) {
          if (isNewBridgeCrossing(level, connections, width, height, current_island, new_island)) continue;

          const adjacent_islands = getAdjacentIslands(level, connections, width, height, current_position[0], current_position[1]);
          /*
          for (let k = 0; k < 4; k++) {
            if (adjacent_islands[k] == null) console.log(null, null, null, null)
            else console.log(adjacent_islands[k][0], adjacent_islands[k][1], adjacent_islands[k][2], adjacent_islands[k][3])
          }*/

          if (adjacent_islands[0] !== null && adjacent_islands[2] !== null) {
            if (adjacent_islands[0][2] > 0 && adjacent_islands[2][0] > 0) {
              new_island[0] = adjacent_islands[0][2];
              new_island[2] = adjacent_islands[2][0];
              if (side % 2 === 0) is_crossing = true;
            }
          }

          if (adjacent_islands[1] !== null && adjacent_islands[3] !== null) {
            if (adjacent_islands[1][3] > 0 && adjacent_islands[3][1] > 0) {
              new_island[1] = adjacent_islands[1][3];
              new_island[3] = adjacent_islands[3][1];
              if (side % 2 === 1) is_crossing = true;
            }
          }
        }

        if (!is_crossing) current_island[side] = (current_island[side] + 1) % 3;
        level[old_position[0]][old_position[1]] = current_island.reduce((prev, next) => prev + next);

        if (!is_crossing) new_island[(side + 2) % 4] = (new_island[(side + 2) % 4] + 1) % 3;
        level[current_position[0]][current_position[1]] = new_island.reduce((prev, next) => prev + next);
      }
    }
  }

  return level;
}

/* ------------------------ Lines level generation ------------------------ */
function generateLinesLevel(width, height) {
  let level = [];
  for (let i = 0; i < height; i++) {
    level.push([]);
    for (let j = 0; j < width; j++) level[i].push([0, 0, 0, 0, "c"]);
  }

  let pos_x = (width / 2) | 0;
  let pos_y = (height / 2) | 0;
  level[pos_y][pos_x] = [0, 0, 0, 0, "s"];

  for (let h = 0; h < 2; h++) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const side = randomInt(1, 4);

        switch (side) {
          case 1:
            if (pos_y - 1 < 0) pos_y += 1;
            level[pos_y - 1][pos_x][(side + 1) % 4] = 1;
            level[pos_y][pos_x][side - 1] = 1;
            pos_y -= 1;
            break;

          case 2:
            if (pos_x + 1 >= width) pos_x -= 1;
            level[pos_y][pos_x + 1][(side + 1) % 4] = 1;
            level[pos_y][pos_x][side - 1] = 1;
            pos_x += 1;
            break;

          case 3:
            if (pos_y + 1 >= height) pos_y -= 1;
            level[pos_y + 1][pos_x][(side + 1) % 4] = 1;
            level[pos_y][pos_x][side - 1] = 1;
            pos_y += 1;
            break;

          case 4:
            if (pos_x - 1 < 0) pos_x += 1;
            level[pos_y][pos_x - 1][(side + 1) % 4] = 1;
            level[pos_y][pos_x][side - 1] = 1;
            pos_x -= 1;
            break;
        }
      }
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let connections_amount = 0;
      for (let k = 0; k < 4; k++) {
        if (level[i][j][k]) connections_amount++;
      }

      if (connections_amount === 1 && level[i][j][4] !== "s") level[i][j][4] = "d";
    }
  }

  return level;
}

/* ------------------------ Squares level generation ------------------------ */
function generateSquaresLevel(width, height) {
  let level = [];
  for (let i = 0; i < height; i++) {
    level.push([]);
    for (let j = 0; j < width; j++) level[i].push([0, 0, 0, 0, "n"]);
  }

  let pos_x = randomInt(0, width - 1);
  let pos_y = randomInt(0, height - 1);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const side = randomInt(1, 4);
      const type = randomInt(1, 8);
      const new_connection = randomInt(1, 4);

      switch (side) {
        case 1:
          if (pos_y - 1 < 0) pos_y += 1;
          level[pos_y - 1][pos_x][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_y -= 1;
          break;

        case 2:
          if (pos_x + 1 >= width) pos_x -= 1;
          level[pos_y][pos_x + 1][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_x += 1;
          break;

        case 3:
          if (pos_y + 1 >= height) pos_y -= 1;
          level[pos_y + 1][pos_x][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_y += 1;
          break;

        case 4:
          if (pos_x - 1 < 0) pos_x += 1;
          level[pos_y][pos_x - 1][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_x -= 1;
          break;
      }

      /* prettier-ignore */
      switch (type) {
        case 1: level[pos_y][pos_x][4] = "n"; break;
        case 2: level[pos_y][pos_x][4] = "r"; break;
        case 3: level[pos_y][pos_x][4] = "h"; break;
        case 4: level[pos_y][pos_x][4] = "v"; break;
        case 5: level[pos_y][pos_x][4] = "vr"; break;
        case 6: level[pos_y][pos_x][4] = "hr"; break;
        case 7: level[pos_y][pos_x][4] = "vh"; break;
        case 8: level[pos_y][pos_x][4] = "vhr"; break;
      }
    }
  }

  return level;
}
