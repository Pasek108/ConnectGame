"use strict";

const PAGE_URL = "http://localhost/Projekty/ConnectGame/index.html";

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

if (localStorage.getItem("easy") == null) localStorage.setItem("easy", "0");
if (localStorage.getItem("normal") == null) localStorage.setItem("normal", "0");
if (localStorage.getItem("advanced") == null) localStorage.setItem("advanced", "0");
if (localStorage.getItem("hexagon") == null) localStorage.setItem("hexagons", "0");
if (localStorage.getItem("triangle") == null) localStorage.setItem("triangles", "0");
if (localStorage.getItem("line") == null) localStorage.setItem("lines", "0");

history.pushState({ option: -1, level: -1 }, "", `${PAGE_URL}`);

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomLevel(width, height) {
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
