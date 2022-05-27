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
  options[i].addEventListener("click", () => {
    if (options[i].classList.contains("blocked")) return;
    let completed_levels = 0;

    /* prettier-ignore */
    switch (i) {
        case 0: completed_levels = parseInt(localStorage.getItem("easy")); break;
        case 1: completed_levels = parseInt(localStorage.getItem("normal")); break;
        case 2: completed_levels = parseInt(localStorage.getItem("advanced")); break;
        case 3: completed_levels = parseInt(localStorage.getItem("hexagons")); break;
        case 4: completed_levels = parseInt(localStorage.getItem("triangles")); break;
        case 5: completed_levels = parseInt(localStorage.getItem("lines")); break;
        case 6: header.innerText = "Losowy"; break;
    }

    if (completed_levels === 200) options[i].classList.add("complete");

    history.pushState({ option: i, level: -1 }, "", `${PAGE_URL}?${i}`);
    loadLevels(i);
  });
}

function loadLevels(option) {
  background.startAnimation();
  background.show();

  let completed_levels = 0;
  levels.innerHTML = "";
  const header = document.createElement("header");

  /* prettier-ignore */
  switch (option) {
    case 0: {
        completed_levels = parseInt(localStorage.getItem("easy"));
        header.innerText = "Łatwy";
    } break;
    case 1: {
        completed_levels = parseInt(localStorage.getItem("normal"));
        header.innerText = "Normalny";
    } break;
    case 2: {
        completed_levels = parseInt(localStorage.getItem("advanced"));
        header.innerText = "Zaawansowany";
    } break;
    case 3: {
        completed_levels = parseInt(localStorage.getItem("hexagons"));
        header.innerText = "Sześciokąty";
    } break;
    case 4: {
        completed_levels = parseInt(localStorage.getItem("triangles"));
        header.innerText = "Trójkąty";
    } break;
    case 5: {
        completed_levels = parseInt(localStorage.getItem("lines"));
        header.innerText = "Linie";
    } break;
    case 6: {
        header.innerText = "Losowy";
    } break;
  }
  levels.appendChild(header);

  for (let j = 0; j < 200; j++) {
    const level_button = document.createElement("div");
    if (j < completed_levels) level_button.className = "complete";
    else if (j > completed_levels) level_button.className = "blocked";
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

  let completed_levels = 0;
  let level_name = "";
  let level_grid = [];

  /* prettier-ignore */
  switch (option) {
    case 0: {
        level_name = "easy";
        completed_levels = parseInt(localStorage.getItem("easy"));
        level_grid = easy_levels[level];
    } break;
    case 1: {
        level_name = "normal";
        completed_levels = parseInt(localStorage.getItem("normal"));
        level_grid = normal_levels[level];
    } break;
    case 2: {
        level_name = "advanced";
        completed_levels = parseInt(localStorage.getItem("advanced"));
        level_grid = advanced_levels[level];
    } break;
    case 3: {
        level_name = "hexagons";
        completed_levels = parseInt(localStorage.getItem("hexagons"));
        level_grid = hexagons_levels[level];
    } break;
    case 4: {
        level_name = "triangles";
        completed_levels = parseInt(localStorage.getItem("triangles"));
        level_grid = triangles_levels[level];
    } break;
    case 5: {
        level_name = "lines";
        completed_levels = parseInt(localStorage.getItem("lines"));
        level_grid = lines_levels[level];
    } break;
    case 6: {
        header.innerText = "Losowy";
    } break;
  }

  const header = document.querySelector(".game header");
  header.innerHTML = "";

  const prev = document.createElement("div");
  prev.className = level === 0 ? "prev disabled" : "prev";
  prev.innerText = "Poprzedni";
  prev.addEventListener("click", () => {
    if (prev.classList.contains("disabled")) return;

    history.pushState({ option: option, level: level - 1 }, "", `${PAGE_URL}?${option}${level}`);
    loadGame(option, level - 1);
  });
  header.appendChild(prev);

  const title = document.createElement("div");
  title.className = "title";
  title.innerText = `Poziom ${level + 1} / 200`;
  header.appendChild(title);

  const next = document.createElement("div");
  next.className = level >= completed_levels ? "next disabled" : "next";
  next.innerText = "Następny";
  next.addEventListener("click", () => {
    if (next.classList.contains("disabled")) return;

    history.pushState({ option: option, level: level + 1 }, "", `${PAGE_URL}?${option}${level + 2}`);
    loadGame(option, level + 1);
  });
  header.appendChild(next);

  levels.classList.add("hidden");
  menu.classList.add("hidden");
  game.classList.remove("hidden");

  new Grid(level_grid, level_name, level);
}
