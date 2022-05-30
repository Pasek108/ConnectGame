"use strict";

const background = new Background();
background.startAnimation();

const menu = document.querySelector(".menu");
const options = menu.querySelectorAll(".option");
const levels = document.querySelector(".levels");
const game = document.querySelector(".game");
const back_button = game.querySelector(".back");
back_button.addEventListener("click", () => {
  history.pushState({ option: -1, level: -1 }, "", `${PAGE_URL}`);
  showMenu();
});

for (let i = 0; i < options.length; i++) {
  if (checkCompletedLevels(i) === 200) options[i].classList.add("complete");

  options[i].addEventListener("click", () => {
    if (options[i].classList.contains("blocked")) return;

    history.pushState({ option: i, level: -1 }, "", `${PAGE_URL}?${i}`);
    loadLevels(i);
  });
}

function loadLevels(option) {
  background.startAnimation();
  background.show();
  levels.innerHTML = "";

  let completed_levels = checkCompletedLevels(option);
  const levels_header = document.createElement("header");

  /* prettier-ignore */
  switch (option) {
    case 0: levels_header.innerText = "Łatwy"; break;
    case 1: levels_header.innerText = "Normalny"; break;
    case 2: levels_header.innerText = "Zaawansowany"; break;
    case 3: levels_header.innerText = "Sześciokąty"; break;
    case 4: levels_header.innerText = "Trójkąty"; break;
    case 5: levels_header.innerText = "Linie"; break;
    case 6: {
        loadGame(option, 0);
        return;
    }
  }

  levels.appendChild(levels_header);

  for (let j = 0; j < 200; j++) {
    let class_name = "";
    if (j < completed_levels) class_name = "complete";
    else if (j > completed_levels) class_name = "blocked";

    const level_button = document.createElement("div");
    level_button.className = class_name;
    level_button.innerText = j + 1;
    level_button.addEventListener("click", () => {
      history.pushState({ option: option, level: j }, "", `${PAGE_URL}?${option}${j + 1}`);
      if (!level_button.classList.contains("blocked")) loadGame(option, j);
    });
    levels.appendChild(level_button);
  }

  menu.classList.add("hidden");
  game.classList.add("hidden");
  levels.classList.remove("hidden");
}

function loadGame(option, level) {
  background.stopAnimation();
  background.hide();

  let completed_levels = checkCompletedLevels(option);
  let level_name = "";
  let level_grid = [];

  /* prettier-ignore */
  switch (option) {
    case 0: {
        level_name = "easy";
        level_grid = easy_levels[level];
    } break;
    case 1: {
        level_name = "normal";
        level_grid = normal_levels[level];
    } break;
    case 2: {
        level_name = "advanced";
        level_grid = advanced_levels[level];
    } break;
    case 3: {
        level_name = "hexagons";
        level_grid = hexagons_levels[level];
    } break;
    case 4: {
        level_name = "triangles";
        level_grid = triangles_levels[level];
    } break;
    case 5: {
        level_name = "lines";
        level_grid = lines_levels[level];
    } break;
    case 6: {
        level_grid = generateRandomLevel(6, 6);
    } break;
  }

  const game_header = document.querySelector(".game header");
  game_header.innerHTML = "";

  const prev = document.createElement("div");
  prev.className = level === 0 ? "prev disabled" : "prev";
  prev.innerText = "Poprzedni";
  prev.addEventListener("click", () => {
    if (prev.classList.contains("disabled")) return;

    history.pushState({ option: option, level: level - 1 }, "", `${PAGE_URL}?${option}${level}`);
    loadGame(option, level - 1);
  });
  game_header.appendChild(prev);

  const title = document.createElement("div");
  title.className = "title";
  title.innerText = `Poziom ${level + 1} / 200`;
  game_header.appendChild(title);

  const next = document.createElement("div");
  next.className = level >= completed_levels ? "next disabled" : "next";
  next.innerText = "Następny";
  next.addEventListener("click", () => {
    if (next.classList.contains("disabled")) return;

    history.pushState({ option: option, level: level + 1 }, "", `${PAGE_URL}?${option}${level + 2}`);
    loadGame(option, level + 1);
  });
  game_header.appendChild(next);

  levels.classList.add("hidden");
  menu.classList.add("hidden");
  game.classList.remove("hidden");

  new SquareGrid(level_grid, level_name, level);
}

function checkCompletedLevels(option) {
  let completed_levels = 0;

  /* prettier-ignore */
  switch (option) {
      case 0: completed_levels = parseInt(localStorage.getItem("easy")); break;
      case 1: completed_levels = parseInt(localStorage.getItem("normal")); break;
      case 2: completed_levels = parseInt(localStorage.getItem("advanced")); break;
      case 3: completed_levels = parseInt(localStorage.getItem("hexagons")); break;
      case 4: completed_levels = parseInt(localStorage.getItem("triangles")); break;
      case 5: completed_levels = parseInt(localStorage.getItem("lines")); break;
  }

  return completed_levels;
}
