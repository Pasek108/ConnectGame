"use strict";

/**
 * Superclass for view-like objects (can be showed or hidden and creates continious history)
 */
class View {
    static views = {
      menu: null,
      levels: null,
      game: null,
      editor_menu: null,
    };

    /**
     * Adds view to active views array and push info about it to history
     * @param {View} view 
     * @param {string} view_name 
     * @param {string} new_url 
     */
    static addView(view, view_name, new_url) {
      this.views[view_name] = view;

      if (new_url === url) history.replaceState({ view_name }, "", url);
      else history.pushState({ view_name }, "", `${new_url}`);
    }

    /**
     * Creates reference to view container by specifed name 
     * @param {string} view_id_name
     */
    constructor(view_id_name) {
      this.container = document.querySelector(view_id_name);
    }
  
    hide() {
      this.container.classList.add("hidden");
    }
  
    show() {
      this.container.classList.remove("hidden");
    }
  }