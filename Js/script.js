"use strict";

const PAGE_URL = "http://localhost/Projekty/ConnectGame/index.html";

/* ------------------------ History ------------------------ */

history.pushState({ option: -1, level: -1 }, "", `${PAGE_URL}`);

addEventListener("popstate", (evt) => {
  const option = evt.state.option;
  const level = evt.state.level;

  if (level >= 0) loadGame(option, level);
  else if (option >= 0 && option < 6) loadLevels(option);
  else showMenu();
});

function showMenu() {
  game.classList.add("hidden");
  levels.classList.add("hidden");
  menu.classList.remove("hidden");
  background.startAnimation();
  background.show();
}

/* ------------------------ Init local storage ------------------------ */

if (localStorage.getItem("easy") == null) localStorage.setItem("easy", "0");
if (localStorage.getItem("normal") == null) localStorage.setItem("normal", "0");
if (localStorage.getItem("advanced") == null) localStorage.setItem("advanced", "0");
if (localStorage.getItem("hexagons") == null) localStorage.setItem("hexagons", "0");
if (localStorage.getItem("triangles") == null) localStorage.setItem("triangles", "0");
if (localStorage.getItem("lines") == null) localStorage.setItem("lines", "0");

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ------------------------ Squares level generation ------------------------ */

function generateSquaresLevel(width, height) {
  let level = [];
  for (let i = 0; i < height + 2; i++) {
    level.push([]);
    for (let j = 0; j < width + 2; j++) level[i].push([0, 0, 0, 0, "n"]);
  }

  let pos_x = randomInt(1, width - 2);
  let pos_y = randomInt(1, height - 2);
  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      const side = randomInt(1, 4);
      const type = randomInt(1, 8);
      const new_connection = randomInt(1, 4);

      switch (side) {
        case 1:
          if (pos_y - 1 < 1) pos_y += 1;
          level[pos_y - 1][pos_x][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_y -= 1;
          break;

        case 2:
          if (pos_x + 1 > width) pos_x -= 1;
          level[pos_y][pos_x + 1][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_x += 1;
          break;

        case 3:
          if (pos_y + 1 > height) pos_y -= 1;
          level[pos_y + 1][pos_x][(side + 1) % 4] = new_connection;
          level[pos_y][pos_x][side - 1] = new_connection;
          pos_y += 1;
          break;

        case 4:
          if (pos_x - 1 < 1) pos_x += 1;
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

/* ------------------------ Lines level generation ------------------------ */

function generateLinesLevel(width, height) {
  let level = [];
  for (let i = 0; i < height + 2; i++) {
    level.push([]);
    for (let j = 0; j < width + 2; j++) level[i].push([false, false, false, false, "c"]);
  }

  let pos_x = randomInt(1, width - 2);
  let pos_y = randomInt(1, height - 2);
  const source = { y: pos_y, x: pos_x };
  level[source.y][source.x] = [false, false, false, false, "s"];

  for (let h = 0; h < 2; h++) {
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        const side = randomInt(1, 4);
        const type = randomInt(1, 100);

        //if (type === 7 && level[pos_y][pos_x][4] !== "s") level[pos_y][pos_x][4] = "d";

        switch (side) {
          case 1:
            if (pos_y - 1 < 1) pos_y += 1;
            level[pos_y - 1][pos_x][(side + 1) % 4] = true;
            level[pos_y][pos_x][side - 1] = true;
            pos_y -= 1;
            break;

          case 2:
            if (pos_x + 1 > width) pos_x -= 1;
            level[pos_y][pos_x + 1][(side + 1) % 4] = true;
            level[pos_y][pos_x][side - 1] = true;
            pos_x += 1;
            break;

          case 3:
            if (pos_y + 1 > height) pos_y -= 1;
            level[pos_y + 1][pos_x][(side + 1) % 4] = true;
            level[pos_y][pos_x][side - 1] = true;
            pos_y += 1;
            break;

          case 4:
            if (pos_x - 1 < 1) pos_x += 1;
            level[pos_y][pos_x - 1][(side + 1) % 4] = true;
            level[pos_y][pos_x][side - 1] = true;
            pos_x -= 1;
            break;
        }
      }
    }
  }

  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      let connections_amount = 0;
      for (let k = 0; k < 4; k++) {
        if (level[i][j][k]) connections_amount++;
      }

      if (connections_amount === 1 && level[i][j][4] !== "s") level[i][j][4] = "d";
    }
  }

  return level;
}
