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
  lines: [
    {
      en: "Bridges",
      pl: "Mosty",
      completed_levels: completed_levels.bridges,
    },
    {
      en: "Pipes",
      pl: "Rury",
      completed_levels: completed_levels.pipes,
    },
    {
      en: "Sliders",
      pl: "Suwaki",
      completed_levels: completed_levels.sliders,
    },
  ],
  squares: [
    {
      en: "Easy 4x4",
      pl: "Łatwy 4x4",
      completed_levels: completed_levels.easy,
    },
    {
      en: "Normal 5x5",
      pl: "Średni 5x5",
      completed_levels: completed_levels.normal,
    },
    {
      en: "Hard 6x6",
      pl: "Trudny 6x6",
      completed_levels: completed_levels.hard,
    },
  ],
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

    if (evt.state.id > 0 && evt.state.id < 4) levels.loadMode(evt.state.mode, evt.state.id);
    else if (evt.state.id === 4) menu.show();
    else if (evt.state.id === 5) menu.show();
    else if (evt.state.id === 6) editor.show();
    else if (evt.state.level > 0 && evt.state.level < 200) game.loadGame(evt.state.mode, evt.state.id, evt.state.level);
  }
}

const page_history = new PageHistory();

/* ------------------------ Squares level generation ------------------------ */
function generateSquaresLevel(width, height) {
  let level = [];
  for (let i = 0; i < height; i++) {
    level.push([]);
    for (let j = 0; j < width; j++) level[i].push([0, 0, 0, 0, "n"]);
  }

  let pos_x = randomInt(0, width);
  let pos_y = randomInt(0, height);
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
