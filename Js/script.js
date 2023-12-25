"use strict";

/* ------------------------ history ------------------------ */
const url = `${location.origin}${location.pathname}`;
addEventListener("popstate", historyBack);

/**
 * Hides all active views (from View.views) and opens previous opened or default (menu) view
 * @param {PopStateEvent} evt
 */
function historyBack(evt) {
  const views_names = Object.keys(View.views);

  for (let i = 0; i < views_names.length; i++) {
    if (View.views[views_names[i]] == null) continue;
    View.views[views_names[i]].hide();
  }

  if (View.views[evt.state.view_name] == null) View.views.menu.show();
  else View.views[evt.state.view_name].show();
}

/* ---------------------- init completed_levels storage ---------------------- */
if (localStorage.getItem("completed_levels") == null) {
  const completed_levels = { bridges: 0, pipes: 0, sliders: 0, easy: 0, normal: 0, hard: 0 };
  localStorage.setItem("completed_levels", JSON.stringify(completed_levels));
}

/* ------------------------ first view objects ------------------------ */
const language = new Language();
const background = new Background();
const menu = new Menu();
